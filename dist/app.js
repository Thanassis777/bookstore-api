"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose = require('mongoose');
const server = 'mongodb://localhost/BookDb';
const port = process.env.PORT || 9000;
const app = (0, express_1.default)();
mongoose.connect(server);
const con = mongoose.connection;
con.on('open', () => {
    console.log('connected...');
});
app.use(express_1.default.json()); // middleware
app.use((0, cors_1.default)());
const bookRouter = require('./routes/books');
const categoryRouter = require('./routes/categories');
const avatarRouter = require('./routes/avatar');
app.use('/books', bookRouter);
app.use('/categories', categoryRouter);
app.use('/books/avatar', avatarRouter);
app.listen(port, () => {
    console.log(`** Server started on port: ${port} **`);
});
