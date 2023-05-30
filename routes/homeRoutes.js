const express = require('express');
const router = express.Router();
const fs = require('fs');

// Homepage route
router.get('/', (req, res) => {
  res.render('homepage');
});

// Login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Read the users data from the users.json file
  fs.readFile('config/users.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const users = JSON.parse(data);

    // Check if the user exists and the password matches
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

// Create account endpoint
router.post('/create-account', (req, res) => {
  const { username, email, password } = req.body;

  // Read the users data from the users.json file
  fs.readFile('config/users.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const users = JSON.parse(data);

    // Check if the username is already taken
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      res.status(400).json({ error: 'Username already exists' });
      return;
    }

    // Create a new user object
    const newUser = {
      username,
      email,
      password
    };

    // Add the new user to the users array
    users.push(newUser);

    // Write the updated users data back to the users.json file
    fs.writeFile('config/users.json', JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.status(200).json({ message: 'Account created successfully' });
    });
  });
});

module.exports = router;
