import express from 'express';
import users from '@controllers/users';
import trim from '@middlewares/trim';
import { verifyToken } from '@middlewares/Token';
import { userFinder, userPermission } from '@middlewares/user.middleware';

const userRouter = express.Router();

userRouter.get('/users', verifyToken, users.getAllUsers);
userRouter.get('/users/:id', verifyToken, userFinder, users.getUser);
userRouter.put('/users/:id', verifyToken, userFinder, userPermission, users.updateUser);
userRouter.post('/auth/signup', trim, users.signup);
userRouter.post('/auth/signin', trim, users.signin);
userRouter.post('/roles', verifyToken, users.assignrole);
userRouter.delete('/roles', verifyToken, users.unassignrole);

export default userRouter;
