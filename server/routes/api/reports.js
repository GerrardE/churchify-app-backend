import express from 'express';
import reports from '@controllers/reports';
import trim from '@middlewares/trim';
import { verifyToken } from '@middlewares/Token';

const reportRouter = express.Router();

reportRouter.post('/membership', verifyToken, trim, reports.membership);
reportRouter.post('/attendance', verifyToken, trim, reports.attendance);
reportRouter.post('/mit', verifyToken, trim, reports.mit);
reportRouter.post('/activity', verifyToken, trim, reports.activity);

export default reportRouter;
