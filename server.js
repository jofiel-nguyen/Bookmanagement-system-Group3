// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const homeRoutes = require('./routes/homeRoutes');
const authRoutes = require('./routes/authRoutes');
const helpers = require('../Bookmanagement-system-Group3/utils/helpers'); // Import the helpers object

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Set Handlebars as the default template engine.
const hbs = exphbs.create({ helpers }); // Pass the helpers object to exphbs.create()
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

// Set up routes
app.use('/', homeRoutes);
app.use('/', authRoutes);

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});
