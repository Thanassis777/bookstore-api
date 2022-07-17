"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
const mongoose_1 = require("mongoose");
var Categories;
(function (Categories) {
    Categories["Action"] = "01";
    Categories["Science"] = "02";
    Categories["Fantasy"] = "03";
    Categories["Mystery"] = "04";
    Categories["Thriller"] = "05";
})(Categories = exports.Categories || (exports.Categories = {}));
const categorySchema = new mongoose_1.Schema({
    code: {
        unique: true,
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
        enum: Object.keys(Categories),
    },
});
const Category = (0, mongoose_1.model)('Category', categorySchema);
exports.default = Category;
