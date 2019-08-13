import express from 'express';
import userRouter from './users';
import zoneRouter from './zones';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => res.status(200).send('Welcome to the TremDev API'));

apiRouter.use('/', userRouter);
apiRouter.use('/zones', zoneRouter);

export default apiRouter;
