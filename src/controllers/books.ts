import { RequestHandler } from 'express';
import Book from '../models/Book';

export type BookId = {
   id: string;
};

export const getBooks: RequestHandler<typeof Book> = async (req, res: any) => {
   try {
      res.send(res.paginatedResults);
   } catch (err) {
      res.status(500).send({ message: err });
   }
};

export const searchBookWithParam: RequestHandler = async (req, res) => {
   try {
      // @ts-ignore
      if (!res.paginatedResults.results.length) return res.status(404).send({ message: 'Could not find book' });

      // @ts-ignore
      res.send(res.paginatedResults);
   } catch (err) {
      res.status(500).send({ message: err });
   }
};

export const getBook: RequestHandler<BookId> = async (req, res) => {
   const _id = req.params.id;

   try {
      const book = await Book.findById(_id);
      if (!book) return res.status(404).send('The Book with the given ID was not found.');
      res.send(book);
   } catch (err) {
      res.status(500).send({ error: err });
   }
};

export const createBook: RequestHandler = async (req, res) => {
   const book = new Book(req.body);

   try {
      const newBook = await book.save();
      res.status(201).send(newBook);
   } catch (err) {
      res.status(400).send(err);
   }
};

export const updateBook: RequestHandler<BookId> = async (req, res) => {
   const _id = req.params.id;

   const updates = Object.keys(req.body);
   const allowedUpdates = ['....'];
   const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

   if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates' });

   try {
      // new -> return updated User
      const book = await Book.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });

      if (!book) return res.status(404).send();
      res.send(book);
   } catch (err) {
      res.status(400).send(err);
   }
};

export const deleteAllBooks: RequestHandler = async (req, res) => {
   Book.deleteMany({})
      .then((data) => {
         res.send({
            message: `${data.deletedCount} Books were deleted successfully!`,
         });
      })
      .catch((err: Error) => {
         res.status(500).send({
            message: err.message || 'Some error occurred while removing all books.',
         });
      });
};

export const deleteBook: RequestHandler<BookId> = async (req, res) => {
   const _id = req.params.id;

   try {
      const book = await Book.findByIdAndDelete(_id);

      if (!book) return res.status(404).send(`Cannot delete Book with id=${_id}. Book was not found!`);

      res.status(200).send('Book was deleted successfully!');
   } catch (err) {
      res.status(500).send();
   }
};
