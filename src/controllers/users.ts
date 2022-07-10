import User from '../models/User';
import { RequestHandler } from 'express';
import { debug } from 'util';

export const createUser: RequestHandler = async (req, res) => {
   const user = new User(req.body);
   const email = req.body.email;

   try {
      await user.save();
      res.status(201).send(user);
      // User.findOne({ email }, (err: Error, currentEmail: any) => {
      //    if (err) {
      //       return res.status(400);
      //    }
      //    if (currentEmail) {
      //       return res.status(400).send('User with same email already exists');
      //    } else {
      //       user.save();
      //       res.status(201).send(user);
      //    }
      // });
   } catch (err) {
      debugger;
      res.status(400).send(err);
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
