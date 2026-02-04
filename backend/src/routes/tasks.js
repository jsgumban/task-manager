const express = require('express');
const db = require('../db');
const { STATUS, PRIORITY } = require('../constants');
const { validateTask } = require('../validators/tasks');

const router = express.Router();

// get all tasks with filtering, sorting, search, and pagination
router.get('/', async (req, res) => {
  const { status, priority, sort, order, search, page = 1, limit = 10 } = req.query;

  let query = db('tasks');

  // filter by status
  if (status) {
    query = query.where('status', status);
  }

  // filter by priority
  if (priority) {
    query = query.where('priority', priority);
  }

  // search by title or description
  if (search) {
    query = query.where(function() {
      this.where('title', 'like', `%${search}%`)
          .orWhere('description', 'like', `%${search}%`);
    });
  }

  // get total count for pagination
  const countQuery = query.clone();
  const [{ count: total }] = await countQuery.count('* as count');

  // sort (default: created_at desc)
  const sortField = sort || 'created_at';
  const sortOrder = order || 'desc';

  // put nulls last for due_date sorting
  if (sortField === 'due_date') {
    query = query.orderByRaw(`CASE WHEN due_date IS NULL OR due_date = '' THEN 1 ELSE 0 END, due_date ${sortOrder}`);
  } else {
    query = query.orderBy(sortField, sortOrder);
  }

  // pagination
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, Math.min(100, parseInt(limit)));
  const offset = (pageNum - 1) * limitNum;

  query = query.limit(limitNum).offset(offset);

  const tasks = await query;
  const totalPages = Math.ceil(total / limitNum);

  res.json({
    data: tasks,
    total,
    page: pageNum,
    totalPages
  });
});

// get single task
router.get('/:id', async (req, res) => {
  const task = await db('tasks').where('id', req.params.id).first();
  if (!task) {
    return res.status(404).json({ error: 'task not found' });
  }
  res.json(task);
});

// create task
router.post('/', async (req, res) => {
  const { title, description, status, priority, due_date } = req.body;

  // validate input
  const errors = validateTask(req.body, false);
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  const [id] = await db('tasks').insert({
    title: title.trim(),
    description: description ? description.trim() : null,
    status: status || STATUS.PENDING,
    priority: priority || PRIORITY.MEDIUM,
    due_date
  });

  const task = await db('tasks').where('id', id).first();
  res.status(201).json(task);
});

// update task
router.put('/:id', async (req, res) => {
  const { title, description, status, priority, due_date } = req.body;

  // validate input
  const errors = validateTask(req.body, true);
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  const existing = await db('tasks').where('id', req.params.id).first();
  if (!existing) {
    return res.status(404).json({ error: 'task not found' });
  }

  await db('tasks').where('id', req.params.id).update({
    title: title !== undefined ? title.trim() : existing.title,
    description: description !== undefined ? (description ? description.trim() : null) : existing.description,
    status: status ?? existing.status,
    priority: priority ?? existing.priority,
    due_date: due_date ?? existing.due_date,
    updated_at: db.fn.now()
  });

  const task = await db('tasks').where('id', req.params.id).first();
  res.json(task);
});

// delete task
router.delete('/:id', async (req, res) => {
  const existing = await db('tasks').where('id', req.params.id).first();
  if (!existing) {
    return res.status(404).json({ error: 'task not found' });
  }

  await db('tasks').where('id', req.params.id).del();
  res.status(204).send();
});

module.exports = router;
