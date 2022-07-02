"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const books_1 = __importDefault(require("./routes/books"));
const categories_1 = __importDefault(require("./routes/categories"));
const avatar_1 = __importDefault(require("./routes/avatar"));
const server = 'mongodb://localhost/BookDb';
const port = process.env.PORT || 9000;
const app = (0, express_1.default)();
mongoose_1.default.connect(server);
const con = mongoose_1.default.connection;
con.on('open', () => {
    console.log('connected...');
});
app.use((0, body_parser_1.json)()); // middleware for parsing incoming requests with JSON payloads
app.use((0, cors_1.default)()); // middleware for enabling cors
app.use('/books', books_1.default);
app.use('/categories', categories_1.default);
app.use('/books/avatar', avatar_1.default);
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//    res.status(500).json({ message: err.message });
// });
app.listen(port, () => {
    console.log(`** Server started on port: ${port} **`);
});
