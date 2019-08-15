import express from 'express';
import userRouter from './users';
import zoneRouter from './zones';
import branchRouter from './branches';
import gtwelveRouter from './gtwelves';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => res.status(200).send('Welcome to the TremDev API'));

apiRouter.use('/', userRouter);
apiRouter.use('/zones', zoneRouter);
apiRouter.use('/branches', branchRouter);
apiRouter.use('/gtwelves', gtwelveRouter);

export default apiRouter;
