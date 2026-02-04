const knex = require('knex');
const path = require('path');
const { STATUS, PRIORITY } = require('./constants');

// use in-memory db for tests, file db otherwise
const isTest = process.env.NODE_ENV === 'test';
const dbPath = isTest ? ':memory:' : (process.env.DB_PATH || path.join(__dirname, '..', 'tasks.db'));

// init knex with sqlite
const db = knex({
  client: 'better-sqlite3',
  connection: {
    filename: dbPath
  },
  useNullAsDefault: true
});

let initialized = false;

// create tasks table
async function init() {
  if (initialized) return;
  const exists = await db.schema.hasTable('tasks');
  if (!exists) {
    await db.schema.createTable('tasks', (table) => {
      table.increments('id');
      table.string('title').notNullable();
      table.text('description');
      table.string('status').defaultTo(STATUS.PENDING);
      table.string('priority').defaultTo(PRIORITY.MEDIUM);
      table.string('due_date');
      table.timestamp('created_at').defaultTo(db.fn.now());
      table.timestamp('updated_at').defaultTo(db.fn.now());
    });
  }
  initialized = true;
}

// export init for tests
db.init = init;

// auto-init for non-test environments
if (!isTest) {
  init();
}

module.exports = db;
