import Book from '../models/Book';
import { ErrorRequestHandler, RequestHandler } from 'express';
import { BookId } from './books';

export const createAvatar: RequestHandler<BookId> = async (req, res, next) => {
   Book.findOneAndUpdate(
      { _id: req.params.id },
      {
         $set: {
            avatar: req.file!.buffer,
         },
      },
      { new: true },
      (err, Book) => {
         if (err) {
            res.send(err);
         } else res.json(Book);
      }
   );
};

export const avatarFail: ErrorRequestHandler = (err: Error, req, res, next) => {
   res.status(400).send({
      error: err.message,
   });
};

export const getAvatar: RequestHandler = async (req, res) => {
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
};
