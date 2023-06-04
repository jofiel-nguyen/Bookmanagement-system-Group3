document.getElementById('search-button').addEventListener('click', function() {
    var searchInput = document.getElementById('search-input').value;
    searchBooks(searchInput);
  });
  
  function searchBooks(query) {
    // Clear previous search results
    document.getElementById('search-results').innerHTML = '';
  
    // Perform API request to Google Books
    var url = 'https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(query);
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Process the search results and display them
        var results = data.items;
        var templateSource = document.getElementById('book-template').innerHTML;
        var template = Handlebars.compile(templateSource);
        var html = template({ books: results });
        document.getElementById('search-results').innerHTML = html;
      })
      .catch(function(error) {
        console.log('An error occurred:', error);
      });
  }
  