// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const homeRoutes = require('./routes/homeRoutes');
const authRoutes = require('./routes/authRoutes');
const helpers = require('./utils/helpers'); // Import the helpers object
const Book = require('./models/book'); // import book model
const axios = require('axios'); // Import the axios library
const { Op } = require('sequelize'); // Import the Op operator from Sequelize

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Set Handlebars as the default template engine.
const hbs = exphbs.create({ helpers }); // Pass the helpers object to exphbs.create()
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Define the session middleware
const sessionMiddleware = session({
  secret: 'super secret secret',
  resave: false,
  saveUninitialized: false,
});

// Include the session middleware
app.use(sessionMiddleware);

// Set up routes
app.use('/', homeRoutes.router); // Access the router property of homeRoutes
app.use('/', authRoutes.router); // Access the router property of authRoutes
app.use(require('./controllers/homeRoutes'));

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});
