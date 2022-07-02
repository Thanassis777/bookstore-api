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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const Book = require('../models/Book');
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield Book.find();
        res.json(books);
    }
    catch (err) {
        res.send('Error ' + err);
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book.findById(req.params.id);
        if (!book)
            res.status(404).send('The Book with the given ID was not found.');
        res.json(book);
    }
    catch (err) {
        res.status(404);
        res.send({ error: err });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const newBook = yield book.save();
        res.json(newBook);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book.findById(req.params.id);
        book.sub;
    }
    catch (err) { }
}));
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Book.deleteMany({})
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
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    Book.findByIdAndRemove(id)
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
        .catch((err) => {
        res.status(500).send({
            message: 'Could not delete Book with id=' + id,
        });
    });
}));
// const upload = multer({
//    limits: { fileSize: 1000000 }, // 1MB
//    fileFilter(req, file, callback) {
//       if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
//          return callback(new Error('Please upload an image file'));
//       }
//
//       callback(undefined, true);
//    },
// });
//
// router.post(
//    '/upload/:id',
//    upload.single('avatar'),
//    async (req, res, next) => {
//       Book.findOneAndUpdate(
//          { _id: req.params.id },
//          {
//             $set: {
//                avatar: req.file.buffer,
//             },
//          },
//          { new: true },
//          (err, Book) => {
//             if (err) {
//                res.send(err);
//             } else res.json(Book);
//          }
//       );
//    },
//    (err, req, res, next) => {
//       res.status(400).send({
//          error: err.message,
//       });
//    }
// );
//
// router.get('/:id/avatar', async (req, res) => {
//    try {
//       const book = await Book.findById(req.params.id);
//
//       if (!book || !book.avatar) {
//          throw new Error();
//       }
//
//       res.set('Content-Type', 'image/jpg');
//       res.send(book.avatar);
//    } catch (err) {
//       res.status(404).send('Book not found');
//    }
// });
module.exports = router;
