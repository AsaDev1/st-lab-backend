const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const USER = {
  username: 'admin',
  password: '1234'
};

// POST /login - returns a token if correct
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    return res.status(200).json({ message: 'Login successful', token: 'abc123' });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

// GET /dashboard - requires a token
app.get('/dashboard', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader === 'Bearer abc123') {
    return res.status(200).json({ data: 'Welcome to your dashboard!' });
  }
  res.status(403).json({ message: 'Unauthorized access' });
});

// Export for Vercel serverless
module.exports = serverless(app);
