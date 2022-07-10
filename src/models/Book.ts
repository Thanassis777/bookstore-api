import { Schema, model, Document } from 'mongoose';
import validator from 'validator';
import { Categories } from './Category';

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
      required: [true, 'ISBN required'],
      type: Number,
      validate: {
         validator: (value: number) => validator.isLength(value.toString(), { min: 10, max: 10 }),
         message: 'ISBN should me exactly 10 digits',
      },
   },
   title: {
      unique: true,
      type: String,
      trim: true,
      required: true,
      validate: {
         validator: (value: string) => validator.isLength(value, { min: 10, max: 120 }),
         message: 'Title length must be min 10 and max 100 chars',
      },
   },
   subtitle: {
      type: String,
      default: '',
      trim: true,
      validate: (value: string) => {
         if (value !== '') return;
         else validator.isLength(value, { min: 2, max: 50 });
      },
   },
   authors: {
      type: [String],
      required: true,
      validate: (values: string) => Array.isArray(values) && values.length > 0,
   },
   category: {
      type: [String],
      required: true,
      enum: {
         values: Object.values(Categories),
         message: '{VALUE} is not supported. Only `01` - `05` values are supported',
      },
      validate: (values: string[]) => {
         if (Array.isArray(values) && values.length === 0) {
            throw new Error(`Categories should have at least one value`);
         }
         if (Array.isArray(values) && values.length > 4) {
            throw new Error(`Categories should have maximum 4 values`);
         }
         if (values.some((val) => values.indexOf(val) !== values.lastIndexOf(val))) {
            throw new Error(`Categories should not have dulicate`);
         }
      },
   },
   publisher: {
      type: String,
      required: true,
      trim: true,
      validate: (value: string) => validator.isLength(value, { min: 5, max: 60 }),
   },
   published: {
      type: Date,
      required: true,
      default: Date.now,
   },
   pages: {
      type: Number,
      required: true,
      min: 1,
      max: 1000,
   },
   rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
   },
   description: {
      type: String,
      trim: true,
      required: true,
      validate: (value: string) => validator.isLength(value, { min: 1, max: 512 }),
   },
   avatar: {
      type: Buffer,
      default: Buffer.alloc(0),
   },
});

const Book = model<IBook>('Book', bookSchema);

export default Book;
