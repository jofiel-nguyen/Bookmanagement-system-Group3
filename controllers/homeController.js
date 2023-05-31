// Home route handler
exports.homePage = (req, res) => {
  // Check if the user is authenticated
  if (req.session.user) {
    // User is authenticated, render the dashboard page
    res.render('dashboard', { user: req.session.user });
  } else {
    // User is not authenticated, render the home page or login page
    res.render('home');
  }
};
