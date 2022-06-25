const multer = require('multer');
const express = require('express');
const router = express.Router();

const Book = require('../models/Book');

const upload = multer({
   limits: { fileSize: 1000000 }, // 1MB
   fileFilter(req, file, callback) {
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
         return callback(new Error('Please upload an image file'));
      }

      callback(undefined, true);
   },
});

router.post(
   '/upload/:id',
   upload.single('avatar'),
   async (req, res, next) => {
      Book.findOneAndUpdate(
         { _id: req.params.id },
         {
            $set: {
               avatar: req.file.buffer,
            },
         },
         { new: true },
         (err, Book) => {
            if (err) {
               res.send(err);
            } else res.json(Book);
         }
      );
   },
   (err, req, res, next) => {
      res.status(400).send({
         error: err.message,
      });
   }
);

router.get('/:id', async (req, res) => {
   try {
      const book = await Book.findById(req.params.id);

      if (!book || !book.avatar) {
         throw new Error();
      }

      res.set('Content-Type', 'image/jpg');
      res.send(book.avatar);
   } catch (err) {
      res.status(404).send('Avatar not found');
   }
});

module.exports = router;
