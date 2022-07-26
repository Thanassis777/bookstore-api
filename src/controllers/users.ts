import User from '../models/User';
import { RequestHandler } from 'express';

export const createUser: RequestHandler = async (req, res) => {
   const user = new User(req.body);
   const email = req.body.email;

   try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
   } catch (err: any) {
      if (err.code === 11000)
         return res.status(429).send({ status: 429, message: 'User already exists with email: ' + email });
      res.status(400).send({ message: err });
   }
};

export const loginUser: RequestHandler = async (req, res) => {
   try {
      const user = await User.findByCredentials(req.body.email, req.body.password);
      const token = await user.generateAuthToken(user.role);

      res.send({ user, token });
   } catch (err) {
      res.status(400).send({ message: 'Unable to login' });
   }
};

export const getUsers: RequestHandler = async (req, res) => {
   try {
      const users = await User.find();
      res.send(users);
   } catch (err) {
      res.status(500).send('Error ' + err);
   }
};
