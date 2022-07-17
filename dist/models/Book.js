"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSchema = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const Category_1 = require("./Category");
exports.bookSchema = new mongoose_1.Schema({
    isbn: {
        unique: true,
        required: [true, 'ISBN required'],
        type: Number,
        validate: {
            validator: (value) => validator_1.default.isLength(value.toString(), { min: 10, max: 10 }),
            message: 'ISBN should me exactly 10 digits',
        },
    },
    title: {
        unique: true,
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: (value) => validator_1.default.isLength(value, { min: 10, max: 120 }),
            message: 'Title length must be min 10 and max 100 chars',
        },
    },
    subtitle: {
        type: String,
        default: '',
        trim: true,
        validate: (value) => {
            if (value !== '')
                return;
            else
                validator_1.default.isLength(value, { min: 2, max: 50 });
        },
    },
    authors: {
        type: [String],
        required: true,
        validate: (values) => Array.isArray(values) && values.length > 0,
    },
    category: {
        type: [String],
        required: true,
        enum: {
            values: Object.values(Category_1.Categories),
            message: '{VALUE} is not supported. Only `01` - `05` values are supported',
        },
        validate: (values) => {
            if (Array.isArray(values) && values.length === 0) {
                throw new Error(`Categories should have at least one value`);
            }
            if (Array.isArray(values) && values.length > 4) {
                throw new Error(`Categories should have maximum 4 values`);
            }
            if (values.some((val) => values.indexOf(val) !== values.lastIndexOf(val))) {
                throw new Error(`Categories should not have dulicate`);
            }
        },
    },
    publisher: {
        type: String,
        required: true,
        trim: true,
        validate: (value) => validator_1.default.isLength(value, { min: 5, max: 60 }),
    },
    published: {
        type: Date,
        required: true,
        default: Date.now,
    },
    pages: {
        type: Number,
        required: true,
        min: 1,
        max: 1000,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    description: {
        type: String,
        trim: true,
        required: true,
        validate: (value) => validator_1.default.isLength(value, { min: 1, max: 512 }),
    },
    avatar: {
        type: Buffer,
        default: Buffer.alloc(0),
    },
});
const Book = (0, mongoose_1.model)('Book', exports.bookSchema);
exports.default = Book;
