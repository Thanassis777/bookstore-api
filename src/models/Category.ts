import { Document, model, Schema } from 'mongoose';

interface ICategory extends Document {
   code: string;
   label: string;
}

export enum Categories {
   Action = '01',
   Science = '02',
   Fantasy = '03',
   Mystery = '04',
   Thriller = '05',
}

const categorySchema = new Schema<ICategory>({
   code: {
      unique: true,
      type: String,
      required: true,
   },
   label: {
      type: String,
      required: true,
      enum: Object.keys(Categories),
   },
});

const Category = model<ICategory>('Category', categorySchema);

export default Category;
