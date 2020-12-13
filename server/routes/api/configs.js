import express from 'express';
import config from '@controllers/configs';
import trim from '@middlewares/trim';
import { verifyToken } from '@middlewares/Token';
import { configFinder, confFinder } from '@middlewares/config.middleware';

const configRouter = express.Router();

configRouter.post('/', verifyToken, trim, config.create);
configRouter.get('/', config.getAll);
configRouter.get('/:id', config.getById);
configRouter.get('/:name/config', confFinder, config.getByName);
configRouter.put('/:id', verifyToken, configFinder, trim, config.update);
configRouter.delete('/:id', verifyToken, configFinder, config.delete);

export default configRouter;
