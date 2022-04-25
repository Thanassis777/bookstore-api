const express = require('express');
const router = express.Router();

const Book = require('../models/Book');

router.get('/', async (req, res) => {
   try {
      const books = await Book.find();
      res.json(books);
   } catch (err) {
      res.send('Error ' + err);
   }
});

router.get('/:id', async (req, res) => {
   try {
      const book = await Book.findById(parseInt(req.params.id));
      if (!book)
         res.status(404).send('The book with the given ID was not found.');
      res.json(book);
   } catch (err) {
      res.status(404);
      res.send({ error: err });
   }
});

router.post('/', async (req, res) => {
   const book = new Book({
      isbn: req.body.isbn,
      title: req.body.title,
      subtitle: req.body.subtitle,
      publisher: req.body.publisher,
      published: req.body.published,
      pages: req.body.pages,
      rating: req.body.rating,
      author: req.body.author,
      description: req.body.description,
   });

   try {
      const newBook = await book.save();
      res.json(newBook);
   } catch (err) {
      res.status(400).send(err);
   }
});

router.patch('/:id', async (req, res) => {
   try {
      const book = await Book.findById(req.params.id);
      book.sub;
   } catch (err) {}
});

router.delete('/:id', async (req, res) => {
   const id = req.params.id;
   Book.findByIdAndRemove(id)
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
            });
         } else {
            res.send({
               message: 'Tutorial was deleted successfully!',
            });
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Could not delete Tutorial with id=' + id,
         });
      });
});

router.delete('/', async (req, res) => {
   Book.deleteMany({})
      .then((data) => {
         res.send({
            message: `${data.deletedCount} Tutorials were deleted successfully!`,
         });
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message ||
               'Some error occurred while removing all tutorials.',
         });
      });
});

module.exports = router;
