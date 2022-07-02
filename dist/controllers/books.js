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
        res.json(books);
    }
    catch (err) {
        res.send('Error ' + err);
    }
});
exports.getBooks = getBooks;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book_1.default.findById(req.params.id);
        if (!book)
            res.status(404).send('The Book with the given ID was not found.');
        res.json(book);
    }
    catch (err) {
        res.status(404);
        res.send({ error: err });
    }
});
exports.getBook = getBook;
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = new Book_1.default({
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
        const newBook = yield book.save();
        res.json(newBook);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.createBook = createBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book_1.default.findById(req.params.id);
    }
    catch (err) { }
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
    const id = req.params.id;
    Book_1.default.findByIdAndRemove(id)
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Book with id=${id}. Maybe Book was not found!`,
            });
        }
        else {
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
});
exports.deleteBook = deleteBook;
