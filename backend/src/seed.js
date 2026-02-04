const db = require('./db');
const { STATUS, PRIORITY } = require('./constants');

// sample tasks
const tasks = [
  { title: 'Buy groceries', description: 'Milk, eggs, bread', status: STATUS.PENDING, priority: PRIORITY.MEDIUM, due_date: '2024-02-10' },
  { title: 'Call dentist', description: null, status: STATUS.PENDING, priority: PRIORITY.LOW, due_date: '2024-02-15' },
  { title: 'Finish report', description: 'Q4 sales report', status: STATUS.IN_PROGRESS, priority: PRIORITY.HIGH, due_date: '2024-02-08' },
  { title: 'Pay electricity bill', description: null, status: STATUS.COMPLETED, priority: PRIORITY.HIGH, due_date: '2024-02-01' },
  { title: 'Book flight tickets', description: 'Tokyo trip March', status: STATUS.PENDING, priority: PRIORITY.MEDIUM, due_date: '2024-02-20' },
  { title: 'Fix leaky faucet', description: 'Kitchen sink', status: STATUS.PENDING, priority: PRIORITY.LOW, due_date: null },
  { title: 'Team meeting prep', description: null, status: STATUS.IN_PROGRESS, priority: PRIORITY.HIGH, due_date: '2024-02-07' },
  { title: 'Renew gym membership', description: null, status: STATUS.PENDING, priority: PRIORITY.LOW, due_date: '2024-02-28' }
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
