import Category from '../models/Category';
import { RequestHandler } from 'express';

export const getCategories: RequestHandler = async (req, res) => {
   try {
      const categories = await Category.find();
      res.json(categories);
   } catch (err) {
      res.send('Error ' + err);
   }
};
