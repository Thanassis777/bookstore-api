import { RequestHandler } from 'express';
import Book from '../models/Book';

export type BookId = {
   id: string;
};

export const getBooks: RequestHandler<typeof Book> = async (req, res) => {
   try {
      const books = await Book.find();

      res.json(books);
   } catch (err) {
      res.send('Error ' + err);
   }
};

export const getBook: RequestHandler<BookId> = async (req, res) => {
   try {
      const book = await Book.findById(req.params.id);
      if (!book) res.status(404).send('The Book with the given ID was not found.');
      res.json(book);
   } catch (err) {
      res.status(404);
      res.send({ error: err });
   }
};

export const createBook: RequestHandler = async (req, res) => {
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
};

export const updateBook: RequestHandler<BookId> = async (req, res) => {
   try {
      const book = await Book.findById(req.params.id);
   } catch (err) {}
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
      .catch(() => {
         res.status(500).send({
            message: 'Could not delete Book with id=' + id,
         });
      });
};
