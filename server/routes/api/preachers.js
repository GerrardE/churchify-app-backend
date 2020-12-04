import express from 'express';
import preachers from '@controllers/preachers';
import trim from '@middlewares/trim';
import { verifyToken } from '@middlewares/Token';
import { preacherFinder, preacherPermission } from '@middlewares/preacher.middleware';

const preacherRouter = express.Router();

preacherRouter.post('/', verifyToken, trim, preacherPermission, preachers.create);
preacherRouter.get('/', verifyToken, preachers.getAll);
preacherRouter.get('/:id', verifyToken, preacherFinder, preachers.getById);
preacherRouter.put('/:id', verifyToken, preacherFinder, preacherPermission, preachers.update);
preacherRouter.delete('/:id', verifyToken, preacherFinder, preacherPermission, preachers.delete);

export default preacherRouter;
