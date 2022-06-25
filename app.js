const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const server = 'mongodb://localhost/BookDb';
const port = process.env.PORT || 9000;

const app = express();

mongoose.connect(server);

const con = mongoose.connection;

con.on('open', () => {
   console.log('connected...');
});

app.use(express.json()); // middleware
app.use(cors());

const bookRouter = require('./routes/books');
const categoryRouter = require('./routes/categories');
const avatarRouter = require('./routes/avatar');

app.use('/books', bookRouter);
app.use('/categories', categoryRouter);
app.use('/books/avatar', avatarRouter);

app.listen(port, () => {
   console.log(`** Server started on port: ${port} **`);
});
