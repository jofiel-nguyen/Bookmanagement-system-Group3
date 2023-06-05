const Book = require('../models/book'); // updated from './book'


// GET route to retrieve books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// POST route to add book
app.post('/books', async (req, res) => {
  const { title, author, publisher, bookLink, bookIsbn, bookImg } = req.body;
  try {
    const newBook = await Book.create({
      title,
      author,
      publisher,
      bookLink,
      bookIsbn,
      bookImg,
    });
    res.json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// // Import the necessary dependencies
// const axios = require('axios');

// // Fetch additional book details from Google Books API based on ISBN or title search
// const fetchBookDetailsFromGoogleBooks = async (searchQuery) => {
//   try {
//     // Make a request to the Google Books API
//     const response = await axios.get(
//       `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=YOUR_GOOGLE_BOOKS_API_KEY`
//     );

//     // Extract and return the relevant book details from the API response
//     const bookDetails = response.data.items.map((item) => ({
//       title: item.volumeInfo.title,
//       author: item.volumeInfo.authors?.join(', '),
//       description: item.volumeInfo.description,
//       coverImage: item.volumeInfo.imageLinks?.thumbnail,
//     }));

//     return bookDetails;
//   } catch (error) {
//     throw new Error('Failed to fetch book details from Google Books API');
//   }
// };

// // Fetch book ratings, reviews, or recommendations from Goodreads API
// const fetchBookDataFromGoodreads = async (bookId) => {
//   try {
//     // Make a request to the Goodreads API
//     const response = await axios.get(
//       `https://www.goodreads.com/book/show/${bookId}.json?key=YOUR_GOODREADS_API_KEY`
//     );

//     // Extract and return the relevant book data from the API response
//     const bookData = {
//       averageRating: response.data.book.average_rating,
//       ratingsCount: response.data.book.ratings_count,
//       reviewsCount: response.data.book.text_reviews_count,
//       recommendationsCount: response.data.book.recommendations_count,
//     };

//     return bookData;
//   } catch (error) {
//     throw new Error('Failed to fetch book data from Goodreads API');
//   }
// };

// // ...

// // Use the API integration functions in your controller actions as needed
// exports.getBookById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Get book details from your database or any other source
//     const book = await Book.findById(id);

//     if (!book) {
//       return res.status(404).json({ message: 'Book not found' });
//     }

//     // Fetch additional details from Google Books API
//     const googleBooksDetails = await fetchBookDetailsFromGoogleBooks(book.isbn);

//     // Fetch book ratings, reviews, or recommendations from Goodreads API
//     const goodreadsData = await fetchBookDataFromGoodreads(book.goodreadsId);

//     // Combine the book details and API data
//     const bookWithDetails = {
//       ...book.toObject(),
//       ...googleBooksDetails[0],
//       ...goodreadsData,
//     };

//     res.status(200).json(bookWithDetails);
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }