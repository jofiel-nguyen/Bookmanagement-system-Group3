// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const fs = require('fs');
const homeRoutes = require('./routes/homeRoutes');
const authRoutes = require('./routes/authRoutes');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const sessionMiddleware = session({
  secret: 'super secret secret',
  resave: false,
  saveUninitialized: false,
});
app.use(sessionMiddleware);

// Read users.json file
const users = JSON.parse(fs.readFileSync('./config/users.json'));

// Set up routes
app.use('/', homeRoutes.router);
app.use('/', authRoutes.router);

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

app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});
