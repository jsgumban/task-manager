const knex = require('knex');
const path = require('path');
const { STATUS, PRIORITY } = require('./constants');

// init knex with sqlite
const db = knex({
  client: 'better-sqlite3',
  connection: {
    filename: process.env.DB_PATH || path.join(__dirname, '..', 'tasks.db')
  },
  useNullAsDefault: true
});

// create tasks table
async function init() {
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
}

init();

module.exports = db;
