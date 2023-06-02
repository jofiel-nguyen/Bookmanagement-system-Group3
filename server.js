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

// Import and configure the login module
const loginModule = require('./public/js/login');
loginModule(app);
app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});
