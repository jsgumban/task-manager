const request = require('supertest');
const app = require('../src/index');
const db = require('../src/db');

// ensure database is initialized before tests
beforeAll(async () => {
  await db.init();
});

// clean up tasks table before each test
beforeEach(async () => {
  await db('tasks').del();
});

// close database connection after all tests
afterAll(async () => {
  await db.destroy();
});

describe('Task API', () => {
  // Test 1: Create task - success
  describe('POST /api/tasks', () => {
    it('should create a new task successfully', async () => {
      const newTask = {
        title: 'Test Task',
        description: 'Test description',
        status: 'pending',
        priority: 'high'
      };

      const res = await request(app)
        .post('/api/tasks')
        .send(newTask)
        .expect(201);

      expect(res.body).toMatchObject({
        title: 'Test Task',
        description: 'Test description',
        status: 'pending',
        priority: 'high'
      });
      expect(res.body.id).toBeDefined();
    });
  });

  // Test 2: Create task - validation error (missing title)
  describe('POST /api/tasks - validation', () => {
    it('should return 400 when title is missing', async () => {
      const invalidTask = {
        description: 'Task without title',
        priority: 'low'
      };

      const res = await request(app)
        .post('/api/tasks')
        .send(invalidTask)
        .expect(400);

      expect(res.body.error).toContain('title is required');
    });

    it('should return 400 when title exceeds 100 characters', async () => {
      const invalidTask = {
        title: 'a'.repeat(101),
        description: 'Description'
      };

      const res = await request(app)
        .post('/api/tasks')
        .send(invalidTask)
        .expect(400);

      expect(res.body.error).toContain('title must be 100 characters or less');
    });
  });

  // Test 3: Get tasks - filter by status
  describe('GET /api/tasks - filter by status', () => {
    it('should filter tasks by status', async () => {
      // create tasks with different statuses
      await db('tasks').insert([
        { title: 'Pending Task', status: 'pending', priority: 'medium' },
        { title: 'In Progress Task', status: 'in-progress', priority: 'medium' },
        { title: 'Completed Task', status: 'completed', priority: 'medium' }
      ]);

      const res = await request(app)
        .get('/api/tasks?status=pending')
        .expect(200);

      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].title).toBe('Pending Task');
      expect(res.body.data[0].status).toBe('pending');
    });
  });

  // Additional test: Pagination
  describe('GET /api/tasks - pagination', () => {
    it('should return paginated results', async () => {
      // create 15 tasks
      const tasks = Array.from({ length: 15 }, (_, i) => ({
        title: `Task ${i + 1}`,
        status: 'pending',
        priority: 'medium'
      }));
      await db('tasks').insert(tasks);

      const res = await request(app)
        .get('/api/tasks?page=1&limit=10')
        .expect(200);

      expect(res.body.data).toHaveLength(10);
      expect(res.body.total).toBe(15);
      expect(res.body.page).toBe(1);
      expect(res.body.totalPages).toBe(2);
    });
  });
});
