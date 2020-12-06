import express from 'express';
import dashboard from '@controllers/dashboard';
import { verifyToken } from '@middlewares/Token';

const dashboardRouter = express.Router();

dashboardRouter.get('/statistics', verifyToken, dashboard.getStatistics);

export default dashboardRouter;
