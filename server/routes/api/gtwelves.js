import express from 'express';
import gtwelves from '@controllers/gtwelves';
import trim from '@middlewares/trim';
import { verifyToken } from '@middlewares/Token';

const gtwelveRouter = express.Router();

gtwelveRouter.post('/', verifyToken, trim, gtwelves.create);

export default gtwelveRouter;
