import { Router } from 'express';
import { createUser, getUsers, loginUser } from '../controllers/users';

const userRouter = Router();

userRouter.post('/', createUser);

userRouter.get('/', getUsers);

userRouter.post('/login', loginUser);

export default userRouter;
