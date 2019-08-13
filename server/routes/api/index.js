import express from 'express';
import userRouter from './users';
import reportRouter from './reports';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => res.status(200).send('Welcome to the TremDev API'));

apiRouter.use('/', userRouter);
apiRouter.use('/reports', reportRouter);

export default apiRouter;
