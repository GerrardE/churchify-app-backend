import express from 'express';
import gtwelves from '@controllers/gtwelves';
import trim from '@middlewares/trim';
import { verifyToken } from '@middlewares/Token';
import { gtwelveFinder, gtwelvePermission } from '@middlewares/gtwelveFinder';

const gtwelveRouter = express.Router();

gtwelveRouter.post('/', verifyToken, trim, gtwelves.create);
gtwelveRouter.get('/', verifyToken, gtwelves.getAll);
gtwelveRouter.put('/:id', verifyToken, gtwelveFinder, gtwelvePermission, gtwelves.update);
gtwelveRouter.delete('/:id', verifyToken, gtwelveFinder, gtwelvePermission, gtwelves.delete);

export default gtwelveRouter;
