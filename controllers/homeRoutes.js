const router = require('express').Router();

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('homepage');
});

const axios = require('axios');
const { Op } = require('sequelize');
const Book = require('../models/book');

// const router = express.Router();

router.get('/search', async (req, res) => {
  const searchData = req.query.searchData;

  if (!searchData || searchData === '') {
    res.status(400).json({ error: 'Search term cannot be empty' });
    return;
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchData}`
    );

    const { items } = response.data;

    if (!items || items.length === 0) {
      res.status(404).json({ error: 'No results found' });
      return;
    }

    const books = items.map((item) => {
      const volumeInfo = item.volumeInfo;

      return {
        title: volumeInfo.title,
        author: volumeInfo.authors ? volumeInfo.authors.join(', ') : '',
        publisher: volumeInfo.publisher,
        bookLink: volumeInfo.previewLink,
        bookIsbn: volumeInfo.industryIdentifiers[0].identifier,
        bookImg: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '',
      };
    });

    const createdBooks = await Book.bulkCreate(books, {
      ignoreDuplicates: true,
    });

    res.render('searchResults', {books: createdBooks});
    // res.json(createdBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;