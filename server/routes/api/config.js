import express from 'express';
import config from '@controllers/configs';
import trim from '@middlewares/trim';
import { verifyToken } from '@middlewares/Token';
import configFinder from '@middlewares/configFinder';

const configRouter = express.Router();

configRouter.post('/', verifyToken, trim, config.create);
configRouter.get('/', verifyToken, config.getAll);
configRouter.get('/:id', verifyToken, configFinder, config.getOne);
configRouter.put('/:id', verifyToken, configFinder, trim, config.update);
configRouter.delete('/:id', verifyToken, configFinder, config.delete);

export default configRouter;
