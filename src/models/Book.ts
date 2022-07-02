import { Schema, model, Document } from 'mongoose';

export interface IBook extends Document {
   isbn: number;
   title: string;
   subtitle: string;
   authors: string[];
   category: string[];
   publisher: string;
   published: Date;
   pages: number;
   rating: number;
   description: string;
   avatar: Buffer;
}

export const bookSchema = new Schema<IBook>({
   isbn: {
      unique: true,
      type: Number,
      required: true,
   },
   title: {
      type: String,
      required: true,
   },
   subtitle: {
      type: String,
      required: true,
   },
   authors: [
      {
         type: String,
         required: true,
      },
   ],
   category: [
      {
         type: String,
         required: true,
      },
   ],
   publisher: {
      type: String,
      required: true,
   },
   published: {
      type: Date,
      required: true,
      default: Date.now,
   },
   pages: {
      type: Number,
      required: true,
   },
   rating: {
      type: Number,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   avatar: {
      type: Buffer,
   },
});

const Book = model<IBook>('Book', bookSchema);

export default Book;
