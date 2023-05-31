const express = require('express');
const router = express.Router();
const session = require('express-session');

// Set up session middleware
const sessionMiddleware = session({
  secret: 'super secret secret',
  resave: false,
  saveUninitialized: false,
});

// Import the app variable from the server.js file
const app = require('../server');

// Add session middleware to the app
app.use(sessionMiddleware);

// Create a route that uses the `req` variable
router.get('/', (req, res) => {
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

req.session.user = user;

// Export the router
module.exports = router;
