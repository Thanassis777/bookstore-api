"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const boookSchema = new mongoose_1.default.Schema({
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
module.exports = mongoose_1.default.model('Book', boookSchema);
