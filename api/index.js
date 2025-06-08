const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({ limit: '1mb' }));
app.use(cors());

const USER = {
  username: 'admin',
  password: '1234'
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    return res.status(200).json({ message: 'Login successful', token: 'abc123' });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

app.get('/dashboard', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader === 'Bearer abc123') {
    return res.status(200).json({ data: 'Welcome to your dashboard!' });
  }
  res.status(403).json({ message: 'Unauthorized access' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

module.exports = serverless(app);
