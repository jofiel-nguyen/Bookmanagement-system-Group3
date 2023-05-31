const Handlebars = require('handlebars');

const helpers = {
  formatDate: function (date) {
    const formattedDate = date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return formattedDate;
  },

  css: function (filename) {
    return new Handlebars.SafeString(`<link rel="stylesheet" href="/css/${filename}">`);
  },
};

module.exports = helpers;
