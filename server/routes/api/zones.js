import express from 'express';
import zones from '@controllers/zones';
import trim from '@middlewares/trim';
import { verifyToken } from '@middlewares/Token';

const zoneRouter = express.Router();

zoneRouter.post('/', verifyToken, trim, zones.create);

export default zoneRouter;
