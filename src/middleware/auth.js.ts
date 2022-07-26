import { JwtPayload } from 'jsonwebtoken';
// import Book from '../models/Book';
// import { SECRET_KEY } from '../models/User';
import { NextFunction } from 'express';

export interface CustomRequest extends Request {
   token: string | JwtPayload;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
   // try {
   //    const token = req.header('Authorization')?.replace('Bearer ', '');
   //    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
   //    const book = await Book.findOne({ _id: decoded._id });
   //    console.log(book);
   // } catch (e) {
   //    // @ts-ignore
   //    res.status(401).send({ error: 'Please authenticate' });
   // }

   next();
};

export default auth;
