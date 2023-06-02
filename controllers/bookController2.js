const Book = require('./book');

// GET route to retrieve books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.render('books', { books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST route to add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, publisher, bookLink, bookImg } = req.body;
    const newBook = await Book.create({
      title,
      author,
      publisher,
      bookLink,
      bookImg,
    });
    res.redirect('/books');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
