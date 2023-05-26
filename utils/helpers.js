const Handlebars = require('handlebars');

module.exports = {
  css: function(file) {
    // Generate the HTML for including CSS file
    return new Handlebars.SafeString('<link rel="stylesheet" href="' + file + '">');
  }
};