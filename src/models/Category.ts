import { Document, model, Schema } from 'mongoose';

interface ICategory extends Document {
   code: string;
   label: string;
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
      enum: ['Action', 'Science', 'Fantasy', 'Mystery', 'Thriller'],
   },
});

const Category = model<ICategory>('Category', categorySchema);

export default Category;
