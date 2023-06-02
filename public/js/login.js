const users = require('../../config/users.json');
const fs = require('fs');

module.exports = function(app) {
  // Login route
  app.get('/login', (req, res) => {
    // Render the login form with the username
    res.render('login', { username: req.session.user?.username });
  });

  // Handle login form submission 
  app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Perform authentication logic here
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
      // Authentication success
      req.session.user = { username };
      req.session.loggedIn = true;
      res.redirect('/');
    } else {
      // Authentication failed
      // Render an error message or redirect back to the login page
      res.send('Invalid username or password');
    }
  });
};
