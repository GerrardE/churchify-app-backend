import express from 'express';
import fellowships from '@controllers/fellowships';
import trim from '@middlewares/trim';
import { verifyToken } from '@middlewares/Token';
import { fellowshipFinder, fellowshipPermission } from '@middlewares/fellowshipFinder';

const fellowshipRouter = express.Router();

fellowshipRouter.post('/', verifyToken, trim, fellowships.create);
fellowshipRouter.get('/', verifyToken, fellowships.getAll);
fellowshipRouter.get('/:id', verifyToken, fellowshipFinder, fellowships.getById);
fellowshipRouter.put('/:id', verifyToken, fellowshipFinder, fellowshipPermission, fellowships.update);
fellowshipRouter.delete('/:id', verifyToken, fellowshipFinder, fellowshipPermission, fellowships.delete);

export default fellowshipRouter;
