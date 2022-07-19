import { Document, model, Schema, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface IUser {
   name: string;
   email: string;
   password: string;
   role: 'admin' | 'user';
   tokens: [{}];
}

interface IUserDocument extends IUser, Document {
   generateAuthToken: () => Promise<string>;
}

interface IUserModel extends Model<IUserDocument> {
   findByCredentials: (email: string, password: string) => Promise<IUserDocument>;
}

const userSchema: Schema<IUserDocument> = new Schema({
   name: {
      type: String,
      required: true,
      trim: true,
   },
   email: {
      type: String,
      unique: true,
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
   role: {
      type: String,
      default: 'user',
      enum: ['admin', 'user'],
   },
   tokens: [
      {
         token: {
            type: String,
            required: true,
         },
      },
   ],
});

userSchema.methods.generateAuthToken = async function () {
   const user = this;
   const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewtoken');

   user.tokens = user.tokens.concat({ token });
   await user.save();

   return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
   const user = await User.findOne({ email });
   if (!user) throw new Error('Unable to login');

   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) throw new Error('Unable to login');

   return user;
};

// Hash password field before user is saved
userSchema.pre('save', async function (next) {
   const user = this;

   if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
   }

   next();
});

const User = model<IUserDocument, IUserModel>('User', userSchema);

export default User;
