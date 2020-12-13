import express from 'express';
import branches from '@controllers/branches';
import trim from '@middlewares/trim';
import { verifyToken } from '@middlewares/Token';
import { branchFinder, branchPermission } from '@middlewares/branch.middleware';

const branchRouter = express.Router();

branchRouter.post('/', verifyToken, trim, branchPermission, branches.create);
branchRouter.get('/', branches.getAll);
branchRouter.get('/:id', branchFinder, branches.getById);
branchRouter.put('/:id', verifyToken, branchFinder, branchPermission, branches.update);
branchRouter.delete('/:id', verifyToken, branchFinder, branchPermission, branches.delete);

export default branchRouter;
