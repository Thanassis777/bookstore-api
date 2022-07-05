import { Router } from 'express';
import { createBook, deleteAllBooks, deleteBook, getBook, getBooks, updateBook } from '../controllers/books';
const bookRouter = Router();

bookRouter.get('/', getBooks);

bookRouter.get('/:id', getBook);

bookRouter.post('/', createBook);

bookRouter.patch('/:id', updateBook);

bookRouter.delete('/', deleteAllBooks);

bookRouter.delete('/:id', deleteBook);

export default bookRouter;
