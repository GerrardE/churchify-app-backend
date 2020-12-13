import express from 'express';
import fellowships from '@controllers/fellowships';
import trim from '@middlewares/trim';
import { verifyToken } from '@middlewares/Token';
import { fellowshipFinder, fellowshipPermission } from '@middlewares/fellowship.middleware';

const fellowshipRouter = express.Router();

fellowshipRouter.post('/', verifyToken, trim, fellowshipPermission, fellowships.create);
fellowshipRouter.get('/', fellowships.getAll);
fellowshipRouter.get('/:id', fellowshipFinder, fellowships.getById);
fellowshipRouter.put('/:id', verifyToken, fellowshipFinder, fellowshipPermission, fellowships.update);
fellowshipRouter.delete('/:id', verifyToken, fellowshipFinder, fellowshipPermission, fellowships.delete);

export default fellowshipRouter;
