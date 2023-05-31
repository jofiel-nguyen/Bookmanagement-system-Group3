const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const session = require('express-session');

const sessionMiddleware = session({
  secret: 'super secret secret',
  resave: false,
  saveUninitialized: false,
});

app.use(sessionMiddleware);

router.get('/login', (req, res) => {
  if (req.session.user) {
    // User is already logged in, redirect to the homepage
    return res.redirect('/');
  }

  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = users.find((user) => user.username === username);

    // Check if the user exists and the password matches
    if (user && await bcrypt.compare(password, user.passwordHash)) {
      // Authentication successful, set session or cookie to remember the user
      req.session.user = user;
      res.redirect('/dashboard');
    } else {
      // Invalid credentials, render login page with an error message
      res.render('login', { error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.render('login', { error: 'An error occurred. Please try again later.' });
  }
});

router.get('/logout', (req, res) => {
  // Implement your logout logic here
  // Clear session data or perform any necessary cleanup
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
