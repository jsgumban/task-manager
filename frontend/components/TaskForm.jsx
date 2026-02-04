'use client';

import { useState, useEffect } from 'react';
import { STATUS, PRIORITY } from '../lib/constants';

// form for creating and editing tasks
export default function TaskForm({ task, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: STATUS.PENDING,
    priority: PRIORITY.MEDIUM,
    due_date: '',
  });

  // populate form when editing
  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        status: task.status || STATUS.PENDING,
        priority: task.priority || PRIORITY.MEDIUM,
        due_date: task.due_date || '',
      });
    } else {
      setForm({ title: '', description: '', status: STATUS.PENDING, priority: PRIORITY.MEDIUM, due_date: '' });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-3">
        <input
          type="text"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border rounded px-3 py-2 w-full"
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border rounded px-3 py-2 w-full"
          rows={2}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border rounded px-3 py-2"
        >
          <option value={STATUS.PENDING}>{STATUS.PENDING}</option>
          <option value={STATUS.IN_PROGRESS}>{STATUS.IN_PROGRESS}</option>
          <option value={STATUS.COMPLETED}>{STATUS.COMPLETED}</option>
        </select>
        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          className="border rounded px-3 py-2"
        >
          <option value={PRIORITY.LOW}>{PRIORITY.LOW}</option>
          <option value={PRIORITY.MEDIUM}>{PRIORITY.MEDIUM}</option>
          <option value={PRIORITY.HIGH}>{PRIORITY.HIGH}</option>
        </select>
        <input
          type="date"
          value={form.due_date}
          onChange={(e) => setForm({ ...form, due_date: e.target.value })}
          className="border rounded px-3 py-2"
        />
        <div className="flex gap-2 mt-2">
          <button type="submit" className="flex-1 px-4 py-2 bg-green-500 text-white rounded">
            {task ? 'Update' : 'Add Task'}
          </button>
          <button type="button" onClick={onCancel} className="flex-1 px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
