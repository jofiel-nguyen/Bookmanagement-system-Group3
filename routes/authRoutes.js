const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models/book');

const router = express.Router();

// Login route
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // User not found
      return res.render('login', { error: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Password doesn't match
      return res.render('login', { error: 'Invalid email or password' });
    }

    // Authentication successful, set session data
    req.session.user = user;

    // Redirect to dashboard or other protected route
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.render('login', { error: 'An error occurred. Please try again later.' });
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
