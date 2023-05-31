const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Get all books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.render('books', { books });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.render('error', { message: 'An error occurred. Please try again later.' });
  }
});

// Get a specific book
router.get('/books/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      res.render('error', { message: 'Book not found' });
    } else {
      res.render('book', { book });
    }
  } catch (error) {
    console.error(`Error fetching book with id ${bookId}:`, error);
    res.render('error', { message: 'An error occurred. Please try again later.' });
  }
});

// Add a new book
router.post('/books', async (req, res) => {
  const { title, author, publicationDate, genre, description } = req.body;

  try {
    const newBook = await Book.create({
      title,
      author,
      publicationDate,
      genre,
      description,
    });

    res.redirect(`/books/${newBook.id}`);
  } catch (error) {
    console.error('Error creating book:', error);
    res.render('error', { message: 'An error occurred. Please try again later.' });
  }
});

// Update a book
router.put('/books/:id', async (req, res) => {
  const bookId = req.params.id;
  const { title, author, publicationDate, genre, description } = req.body;

  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      res.render('error', { message: 'Book not found' });
    } else {
      await book.update({
        title,
        author,
        publicationDate,
        genre,
        description,
      });

      res.redirect(`/books/${book.id}`);
    }
  } catch (error) {
    console.error(`Error updating book with id ${bookId}:`, error);
    res.render('error', { message: 'An error occurred. Please try again later.' });
  }
});

// Delete a book
router.delete('/books/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      res.render('error', { message: 'Book not found' });
    } else {
      await book.destroy();
      res.redirect('/books');
    }
  } catch (error) {
    console.error(`Error deleting book with id ${bookId}:`, error);
    res.render('error', { message: 'An error occurred. Please try again later.' });
  }
});

module.exports = router;
