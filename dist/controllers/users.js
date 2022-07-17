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
exports.getUsers = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User_1.default(req.body);
    const email = req.body.email;
    try {
        yield user.save();
        res.status(201).send(user);
        // User.findOne({ email }, (err: Error, currentEmail: any) => {
        //    if (err) {
        //       return res.status(400);
        //    }
        //    if (currentEmail) {
        //       return res.status(400).send('User with same email already exists');
        //    } else {
        //       user.save();
        //       res.status(201).send(user);
        //    }
        // });
    }
    catch (err) {
        debugger;
        res.status(400).send(err);
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.send(users);
    }
    catch (err) {
        res.status(500).send('Error ' + err);
    }
});
exports.getUsers = getUsers;
