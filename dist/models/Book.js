"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSchema = void 0;
const mongoose_1 = require("mongoose");
exports.bookSchema = new mongoose_1.Schema({
    isbn: {
        unique: true,
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    authors: [
        {
            type: String,
            required: true,
        },
    ],
    category: [
        {
            type: String,
            required: true,
        },
    ],
    publisher: {
        type: String,
        required: true,
    },
    published: {
        type: Date,
        required: true,
        default: Date.now,
    },
    pages: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    avatar: {
        type: Buffer,
    },
});
const Book = (0, mongoose_1.model)('Book', exports.bookSchema);
exports.default = Book;
