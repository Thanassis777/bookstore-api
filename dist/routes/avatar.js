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
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const Book = require('../models/Book');
const upload = (0, multer_1.default)({
    limits: { fileSize: 1000000 },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return callback(new Error('Please upload an image file'));
        }
        callback(undefined, true);
    },
});
router.post('/upload/:id', upload.single('avatar'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    Book.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            avatar: req.file.buffer,
        },
    }, { new: true }, (err, Book) => {
        if (err) {
            res.send(err);
        }
        else
            res.json(Book);
    });
}), (err, req, res, next) => {
    res.status(400).send({
        error: err.message,
    });
});
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book.findById(req.params.id);
        if (!book || !book.avatar) {
            throw new Error();
        }
        res.set('Content-Type', 'image/jpg');
        res.send(book.avatar);
    }
    catch (err) {
        res.status(404).send('Avatar not found');
    }
}));
module.exports = router;
