import express from 'express';
import branches from '@controllers/branches';
import trim from '@middlewares/trim';
import { verifyToken } from '@middlewares/Token';

const branchRouter = express.Router();

branchRouter.post('/', verifyToken, trim, branches.create);

export default branchRouter;
