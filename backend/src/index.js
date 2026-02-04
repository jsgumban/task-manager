const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// routes
app.use('/api/tasks', tasksRouter);

// health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'something went wrong' });
});

// start server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
