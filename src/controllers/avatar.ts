import Book from '../models/Book';
import { ErrorRequestHandler, RequestHandler } from 'express';
import { BookId } from './books';

export const createAvatar: RequestHandler<BookId> = async (req, res, next) => {
   const _id = req.params.id;

   if (req.file === undefined) return res.status(400).send('Please upload a file');

   try {
      const updatedBook = await Book.findByIdAndUpdate(
         _id,
         { avatar: req.file.buffer },
         { new: true, runValidators: true }
      );
      if (!updatedBook) return res.status(404).send('Book not found with id: ' + _id);
      res.send(updatedBook);

      // Book.findOneAndUpdate(
      //    { _id },
      //    {
      //       $set: {
      //          avatar: req.file!.buffer,
      //       },
      //    },
      //    { new: true },
      //    (err, Book) => {
      //       if (err) {
      //          res.send(err);
      //       } else res.send(Book);
      //    }
      // );
   } catch (err) {
      res.status(400).send(err);
   }
};

export const avatarFail: ErrorRequestHandler = (err: Error, req, res, next) => {
   res.status(400).send({
      error: err.message,
   });
};

export const getAvatar: RequestHandler = async (req, res) => {
   const _id = req.params.id;

   try {
      const book = await Book.findById(_id);

      if (!book || !book.avatar) {
         return res.status(404).send('The Book with the given ID was not found.');
      }

      res.set('Content-Type', 'image/jpg');
      res.send(book.avatar);
   } catch (err) {
      res.status(404).send('Avatar not found');
   }
};
