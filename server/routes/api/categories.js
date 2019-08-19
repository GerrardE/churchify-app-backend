import express from 'express';
import categories from '@controllers/categories';
import trim from '@middlewares/trim';
import { verifyToken } from '@middlewares/Token';
import { categoryFinder, categoryPermission } from '@middlewares/categoryFinder';

const categoryRouter = express.Router();

categoryRouter.post('/', verifyToken, trim, categories.create);
categoryRouter.get('/', verifyToken, categories.getAll);
categoryRouter.put('/:id', verifyToken, categoryFinder, categoryPermission, categories.update);
categoryRouter.delete('/:id', verifyToken, categoryFinder, categoryPermission, categories.delete);

export default categoryRouter;
