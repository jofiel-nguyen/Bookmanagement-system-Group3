const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    publisher: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookLink: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookIsbn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookImg: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
  }
);

module.exports = Book;
