const express = require('express');
//const Book = require('../models/bookModels');

const bookRouter = express.Router();

function routes(Book) {

  bookRouter.route('/books')
    .post((req, res) => {
      const book = new Book(req.body);
      book.save();
      return res.status(201).json(book);
    })
    .get((req,res) => {
      const { query } = req;
      //const response = { hello: "Hi this is from BookRouter!"};
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }
        return res.json(books);
      });
      //res.json(response);
    });

  bookRouter.route('/books/:bookId')
    .get((req,res) => {
      Book.findById(req.params.bookId, (err, book) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })

    .put((req,res) => {
      Book.findById(req.params.bookId, (err, book) => {
        if (err) {
          return res.send(err);
        }
        book.title = req.body.title;
        book.genre = req.body.genre;
        book.author = req.body.author;
        book.read = req.body.read;
        book.save();
        return res.json(book);
      });
    });
  return bookRouter;
}
module.exports = routes;
