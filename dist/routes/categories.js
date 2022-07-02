"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_1 = require("../controllers/categories");
const categoryRouter = (0, express_1.Router)();
categoryRouter.get('/', categories_1.getCategories);
exports.default = categoryRouter;
