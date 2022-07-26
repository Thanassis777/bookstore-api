import { Router } from 'express';
import {
   createBook,
   deleteAllBooks,
   deleteBook,
   getBook,
   searchBookWithParam,
   getBooks,
   updateBook,
} from '../controllers/books';
import paginatedResults from '../middleware/paginatedResults';
import Book from '../models/Book';
import paginatedFilteredResults from '../middleware/paginatedFilteredResults';

const bookRouter = Router();

bookRouter.get('/', paginatedResults(Book), getBooks);

bookRouter.get('/search', paginatedFilteredResults(Book), searchBookWithParam);

bookRouter.get('/:id', getBook);

bookRouter.post('/', createBook);

bookRouter.patch('/:id', updateBook);

bookRouter.delete('/', deleteAllBooks);

bookRouter.delete('/:id', deleteBook);

export default bookRouter;
