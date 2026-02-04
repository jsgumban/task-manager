const db = require('./db');
const { STATUS, PRIORITY } = require('./constants');

// sample tasks
const tasks = [
  { title: 'Buy groceries', description: 'Milk, eggs, bread, cheese, vegetables', status: STATUS.PENDING, priority: PRIORITY.MEDIUM, due_date: '2025-02-10' },
  { title: 'Call dentist', description: 'Schedule annual checkup', status: STATUS.PENDING, priority: PRIORITY.LOW, due_date: '2025-02-15' },
  { title: 'Finish quarterly report', description: 'Q4 sales report for management review', status: STATUS.IN_PROGRESS, priority: PRIORITY.HIGH, due_date: '2025-02-08' },
  { title: 'Pay electricity bill', description: null, status: STATUS.COMPLETED, priority: PRIORITY.HIGH, due_date: '2025-02-01' },
  { title: 'Book flight tickets', description: 'Tokyo trip in March - check prices on multiple sites', status: STATUS.PENDING, priority: PRIORITY.MEDIUM, due_date: '2025-02-20' },
  { title: 'Fix leaky faucet', description: 'Kitchen sink has been dripping for a week', status: STATUS.PENDING, priority: PRIORITY.LOW, due_date: null },
  { title: 'Prepare team meeting agenda', description: 'Include project updates and Q1 goals', status: STATUS.IN_PROGRESS, priority: PRIORITY.HIGH, due_date: '2025-02-07' },
  { title: 'Renew gym membership', description: null, status: STATUS.PENDING, priority: PRIORITY.LOW, due_date: '2025-02-28' },
  { title: 'Review pull requests', description: 'Check pending PRs from the team', status: STATUS.PENDING, priority: PRIORITY.MEDIUM, due_date: '2025-02-06' },
  { title: 'Update project documentation', description: 'Add new API endpoints to docs', status: STATUS.PENDING, priority: PRIORITY.LOW, due_date: null },
  { title: 'Send invoice to client', description: 'January services - Project Alpha', status: STATUS.COMPLETED, priority: PRIORITY.HIGH, due_date: '2025-01-31' },
  { title: 'Order office supplies', description: 'Printer paper, pens, sticky notes', status: STATUS.PENDING, priority: PRIORITY.LOW, due_date: '2025-02-12' }
];

async function seed() {
  // clear existing tasks
  await db('tasks').del();

  // insert tasks
  await db('tasks').insert(tasks);

  console.log('Seeded ' + tasks.length + ' tasks');
  process.exit(0);
}

seed();
