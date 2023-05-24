const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const exphbs = require('express-handlebars');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// View Engine
app.engine(
    'handlebars',
    exphbs({
      defaultLayout: 'main',
    })
  );
  app.set('view engine', 'handlebars');
  
// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/bookRoutes'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
