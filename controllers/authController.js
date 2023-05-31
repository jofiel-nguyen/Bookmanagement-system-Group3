// Import necessary dependencies and modules
const User = require('../models/User');
const bcrypt = require('bcrypt');
const fs = require('fs');

// Handle user registration
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists in the file
    const existingUser = await fs.readFileSync('./config/users.json', 'utf8')
      .then(data => JSON.parse(data))
      .then(users => users.find((user) => user.username === username));
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      password: hashedPassword
    });

    // Save the user to the file
    const users = await fs.readFileSync('./config/users.json', 'utf8')
      .then(data => JSON.parse(data))
      .then(data => {
        data.push(newUser);
        return data;
      });
    await fs.writeFileSync('./config/users.json', JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Handle user login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the file
    const user = await fs.readFileSync('./config/users.json', 'utf8')
      .then(data => JSON.parse(data))
      .then(users => users.find((user) => user.username === username));
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password in the file
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Set the user as logged in
    req.session.user = user;

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Handle user logout
exports.logoutUser = (req, res) => {
    // Clear the user's session
    req.session.destroy();

    res.status(200).json({ message: `Goodbye! Logout successful` });
  };
