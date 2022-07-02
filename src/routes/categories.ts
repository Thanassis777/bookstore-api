import { Router } from 'express';
import { getCategories } from '../controllers/categories';

const categoryRouter = Router();

categoryRouter.get('/', getCategories);

export default categoryRouter;
