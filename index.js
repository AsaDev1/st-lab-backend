const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;  

app.use(express.json());

app.use(cors());

const USER = {
  username: 'admin',
  password: '1234'
};

let loggedIn = false;

app.post('/login', (req, res) => {
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
