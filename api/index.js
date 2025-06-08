const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

const USER = {
  username: 'admin',
  password: '1234'
};

let loggedIn = false;

// Routes
app.post('/login', (req, res) => {
  console.log('Login attempt:', req.body);
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    loggedIn = true;
    return res.status(200).json({ message: 'Login successful', token: 'abc123' });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

app.get('/dashboard', (req, res) => {
  if (loggedIn) {
    return res.status(200).json({ data: 'Welcome to your dashboard!' });
  }
  res.status(403).json({ message: 'Unauthorized access' });
});

// Export for Vercel
module.exports = serverless(app);
