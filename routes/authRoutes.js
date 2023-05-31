const express = require('express');
const router = express.Router();
const session = require('express-session');

// Set up session middleware
const sessionMiddleware = session({
  secret: 'super secret secret',
  resave: false,
  saveUninitialized: false,
});

// Create a route that uses the `req` variable
router.get('/login', (req, res) => {
  // Check if the user is authenticated
  if (req.session.user) {
    // User is already logged in, redirect to the homepage
    return res.redirect('/');
  } else {
    // User is not logged in, render the login page
    res.render('login');
  }
});

// Store the user's information in the session
const user = {
  name: 'John Doe',
  email: 'johndoe@example.com'
};

router.post('/login', (req, res) => {
  // Store the user's information in the session
  req.session.user = user;

  // Redirect to the homepage
  res.redirect('/');
});

// Export the router and sessionMiddleware directly
module.exports = { router, sessionMiddleware };
