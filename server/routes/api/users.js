import express from 'express';
import users from '@controllers/users';
import trim from '@middlewares/trim';
import { verifyToken } from '@middlewares/Token';

const userRouter = express.Router();

userRouter.post('/auth/signup', trim, users.signup);
userRouter.post('/auth/signin', trim, users.signin);
userRouter.post('/roles', verifyToken, users.assignrole);
userRouter.delete('/roles', verifyToken, users.unassignrole);

export default userRouter;
