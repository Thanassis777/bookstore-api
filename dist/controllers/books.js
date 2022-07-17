"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.deleteAllBooks = exports.updateBook = exports.createBook = exports.getBook = exports.getBooks = void 0;
const Book_1 = __importDefault(require("../models/Book"));
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield Book_1.default.find();
        res.send(books);
    }
    catch (err) {
        res.status(500).send('Error ' + err);
    }
});
exports.getBooks = getBooks;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    try {
        const book = yield Book_1.default.findById(_id);
        if (!book)
            return res.status(404).send('The Book with the given ID was not found.');
        res.send(book);
    }
    catch (err) {
        res.status(500).send({ error: err });
    }
});
exports.getBook = getBook;
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = new Book_1.default(req.body);
    try {
        const newBook = yield book.save();
        res.status(201).send(newBook);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.createBook = createBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['....'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation)
        return res.status(400).send({ error: 'Invalid updates' });
    try {
        // new -> return updated User
        const book = yield Book_1.default.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        if (!book)
            return res.status(404).send();
        res.send(book);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.updateBook = updateBook;
const deleteAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Book_1.default.deleteMany({})
        .then((data) => {
        res.send({
            message: `${data.deletedCount} Books were deleted successfully!`,
        });
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error occurred while removing all books.',
        });
    });
});
exports.deleteAllBooks = deleteAllBooks;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    try {
        const book = yield Book_1.default.findByIdAndDelete(_id);
        if (!book)
            return res.status(404).send(`Cannot delete Book with id=${_id}. Book was not found!`);
        res.status(200).send('Book was deleted successfully!');
    }
    catch (err) {
        res.status(500).send();
    }
});
exports.deleteBook = deleteBook;
