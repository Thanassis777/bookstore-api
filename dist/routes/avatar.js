"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const avatar_1 = require("../controllers/avatar");
const avatarRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    limits: { fileSize: 1000000 },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return callback(new Error('Please upload an image file'));
        }
        callback(null, true);
    },
});
avatarRouter.post('/upload/:id', upload.single('avatar'), avatar_1.createAvatar, avatar_1.avatarFail);
avatarRouter.get('/:id', avatar_1.getAvatar);
exports.default = avatarRouter;
