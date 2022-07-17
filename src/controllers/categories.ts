import Category from '../models/Category';
import { RequestHandler } from 'express';

export const getCategories: RequestHandler = async (req, res) => {
   try {
      const categories = await Category.find({}, { _id: 0 });
      res.send(categories);
   } catch (err) {
      res.status(404).send('Error ' + err);
   }
};
