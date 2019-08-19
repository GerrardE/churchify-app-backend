import express from 'express';
import branches from '@controllers/branches';
import trim from '@middlewares/trim';
import { verifyToken } from '@middlewares/Token';
import { branchFinder, branchPermission } from '@middlewares/branchFinder';

const branchRouter = express.Router();

branchRouter.post('/', verifyToken, trim, branches.create);
branchRouter.get('/', verifyToken, branches.getAll);
branchRouter.put('/:id', verifyToken, branchFinder, branchPermission, branches.update);
branchRouter.delete('/:id', verifyToken, branchFinder, branchPermission, branches.delete);

export default branchRouter;
