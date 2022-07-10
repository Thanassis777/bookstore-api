import { Document, model, Schema } from 'mongoose';
import validator from 'validator';

interface IUser extends Document {
   name: string;
   email: string;
   password: string;
   age: number;
}

const userSchema = new Schema<IUser>({
   name: {
      type: String,
      required: true,
      trim: true,
   },
   email: {
      type: String,
      unique: true,
      index: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
         if (!validator.isEmail(value)) {
            throw new Error('Email is invalid');
         }
      },
   },
   password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value: string) {
         if (value.toLowerCase().includes('password')) {
            throw new Error('Password cannot contain "password"');
         }
      },
   },
   age: {
      type: Number,
      default: 0,
      validate(value: number) {
         if (value < 0) {
            throw new Error('Age must be a positive number');
         }
      },
   },
});

const User = model<IUser>('User', userSchema);

export default User;
