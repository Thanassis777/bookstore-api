"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    code: {
        unique: true,
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
        enum: ['Action', 'Science', 'Fantasy', 'Mystery', 'Thriller'],
    },
});
module.exports = mongoose_1.default.model('Category', categorySchema);
