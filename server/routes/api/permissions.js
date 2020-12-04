import express from 'express';
import permissions from '@controllers/permissions';
import trim from '@middlewares/trim';
import { verifyToken } from '@middlewares/Token';
import { permissionFinder } from '@middlewares/permission.middleware';

const permissionRouter = express.Router();

permissionRouter.post('/', verifyToken, trim, permissions.create);
permissionRouter.get('/', verifyToken, permissions.getAll);
permissionRouter.get('/:id', verifyToken, permissionFinder, permissions.getById);
permissionRouter.put('/:id', verifyToken, permissionFinder, permissions.update);
permissionRouter.delete('/:id', verifyToken, permissionFinder, permissions.delete);

export default permissionRouter;
