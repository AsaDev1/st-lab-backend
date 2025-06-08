const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

// Use express.json instead of body-parser
app.use(express.json());

// Enable CORS for all origins (development only)
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

app.post('/login', (req, res) => {
  console.log('Login attempt:', req.body);  // Debug log
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

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
