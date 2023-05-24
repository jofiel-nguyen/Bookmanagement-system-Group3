const express = require('express');
const { Book } = require('../models');

const router = express.Router();

// Retrieve all books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.render('books', { books });
  } catch (error) {
    console.error('Error retrieving books:', error);
    res.render('error', { error: 'An error occurred. Please try again later.' });
  }
});

// Add a new book
router.get('/books/new', (req, res) => {
  res.render('add-book');
});

router.post('/books/new', async (req, res) => {
  const { title, author, publicationDate, genre, description } = req.body;

  try {
    await Book.create({ title, author, publicationDate, genre, description });
    res.redirect('/books');
  } catch (error) {
    console.error('Error adding book:', error);
    res.render('add-book', { error: 'An error occurred. Please try again later.' });
  }
});

// Edit a book
router.get('/books/:id/edit', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);
    res.render('edit-book', { book });
  } catch (error) {
    console.error('Error retrieving book:', error);
    res.render('error', { error: 'An error occurred. Please try again later.' });
  }
});

router.post('/books/:id/edit', async (req, res) => {
  const { id } = req.params;
  const { title, author, publicationDate, genre, description } = req.body;

  try {
    await Book.update({ title, author, publicationDate, genre, description }, { where: { id } });
    res.redirect('/books');
  } catch (error) {
    console.error('Error updating book:', error);
    res.render('edit-book', { error: 'An error occurred. Please try again later.' });
  }
});

// Delete a book
router.post('/books/:id/delete', async (req, res) => {
  const { id } = req.params;

  try {
    await Book.destroy({ where: { id } });
    res.redirect('/books');
  } catch (error) {
    console.error('Error deleting book:', error);
    res.render('error', { error: 'An error occurred. Please try again later.' });
  }
});

module.exports = router;
