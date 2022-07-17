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
exports.getAvatar = exports.avatarFail = exports.createAvatar = void 0;
const Book_1 = __importDefault(require("../models/Book"));
const createAvatar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    if (req.file === undefined)
        return res.status(400).send('Please upload a file');
    try {
        const updatedBook = yield Book_1.default.findByIdAndUpdate(_id, { avatar: req.file.buffer }, { new: true, runValidators: true });
        if (!updatedBook)
            return res.status(404).send('Book not found with id: ' + _id);
        res.send(updatedBook);
        // Book.findOneAndUpdate(
        //    { _id },
        //    {
        //       $set: {
        //          avatar: req.file!.buffer,
        //       },
        //    },
        //    { new: true },
        //    (err, Book) => {
        //       if (err) {
        //          res.send(err);
        //       } else res.send(Book);
        //    }
        // );
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.createAvatar = createAvatar;
const avatarFail = (err, req, res, next) => {
    res.status(400).send({
        error: err.message,
    });
};
exports.avatarFail = avatarFail;
const getAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    try {
        const book = yield Book_1.default.findById(_id);
        if (!book || !book.avatar) {
            return res.status(404).send('The Book with the given ID was not found.');
        }
        res.set('Content-Type', 'image/jpg');
        res.send(book.avatar);
    }
    catch (err) {
        res.status(404).send('Avatar not found');
    }
});
exports.getAvatar = getAvatar;
