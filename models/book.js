const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
  bookImg: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT, // or any other appropriate data type for ratings
    allowNull: true, // Set to true if a book may not have a rating
  },
  reviews: {
    type: DataTypes.INTEGER, // or any other appropriate data type for reviews
    allowNull: true, // Set to true if a book may not have reviews
  },
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
  }
);

module.exports = Book;
