import express from 'express';
import downloads from '@controllers/downloads';
import trim from '@middlewares/trim';
import { verifyToken } from '@middlewares/Token';
import { downloadFinder, downloadPermission } from '@middlewares/downloadFinder';

const downloadRouter = express.Router();

downloadRouter.post('/', verifyToken, trim, downloads.create);
downloadRouter.get('/', verifyToken, downloads.getAll);
downloadRouter.put('/:id', verifyToken, downloadFinder, downloadPermission, downloads.update);
downloadRouter.delete('/:id', verifyToken, downloadFinder, downloadPermission, downloads.delete);

export default downloadRouter;
