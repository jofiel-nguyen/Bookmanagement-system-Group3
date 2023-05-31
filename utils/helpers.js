const helpers = {
  formatDate: function (date) {
    const formattedDate = date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return formattedDate;
  },
 
};

module.exports = helpers;
