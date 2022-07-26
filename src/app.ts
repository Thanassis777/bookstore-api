import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { json } from 'body-parser';

import bookRouter from './routes/books';
import categoryRouter from './routes/categories';
import avatarRouter from './routes/avatar';
import userRouter from './routes/users';
// import Book from './models/Book';

const server = 'mongodb://localhost:27017/BookDb';
const port = process.env.PORT || 9000;

const app = express();

mongoose.connect(server);
const con = mongoose.connection;

con.on('open', () => {
   console.log('Connected successfully!');
});

app.use(json()); // middleware for parsing incoming requests with JSON payloads
app.use(cors()); // middleware for enabling cors

app.use('/books', bookRouter);
app.use('/books/avatar', avatarRouter);

app.use('/users', userRouter);
app.use('/categories', categoryRouter);

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//    res.status(500).json({ message: err.message });
// });

app.listen(port, () => {
   console.log(`** Server started on port: ${port} **`);
});
