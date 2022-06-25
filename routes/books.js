const express = require('express');
const router = express.Router();

const Book = require('../models/Book');
const multer = require('multer');

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
      const book = await Book.findById(req.params.id);
      if (!book) res.status(404).send('The Book with the given ID was not found.');
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
      category: req.body.category,
      pages: req.body.pages,
      rating: req.body.rating,
      authors: req.body.authors,
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

router.delete('/', async (req, res) => {
   Book.deleteMany({})
      .then((data) => {
         res.send({
            message: `${data.deletedCount} Books were deleted successfully!`,
         });
      })
      .catch((err) => {
         res.status(500).send({
            message: err.message || 'Some error occurred while removing all books.',
         });
      });
});

router.delete('/:id', async (req, res) => {
   const id = req.params.id;
   Book.findByIdAndRemove(id)
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot delete Book with id=${id}. Maybe Book was not found!`,
            });
         } else {
            res.send({
               message: 'Book was deleted successfully!',
            });
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Could not delete Book with id=' + id,
         });
      });
});

// const upload = multer({
//    limits: { fileSize: 1000000 }, // 1MB
//    fileFilter(req, file, callback) {
//       if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
//          return callback(new Error('Please upload an image file'));
//       }
//
//       callback(undefined, true);
//    },
// });
//
// router.post(
//    '/upload/:id',
//    upload.single('avatar'),
//    async (req, res, next) => {
//       Book.findOneAndUpdate(
//          { _id: req.params.id },
//          {
//             $set: {
//                avatar: req.file.buffer,
//             },
//          },
//          { new: true },
//          (err, Book) => {
//             if (err) {
//                res.send(err);
//             } else res.json(Book);
//          }
//       );
//    },
//    (err, req, res, next) => {
//       res.status(400).send({
//          error: err.message,
//       });
//    }
// );
//
// router.get('/:id/avatar', async (req, res) => {
//    try {
//       const book = await Book.findById(req.params.id);
//
//       if (!book || !book.avatar) {
//          throw new Error();
//       }
//
//       res.set('Content-Type', 'image/jpg');
//       res.send(book.avatar);
//    } catch (err) {
//       res.status(404).send('Book not found');
//    }
// });

module.exports = router;
