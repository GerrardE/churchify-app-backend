import express from 'express';
import cities from '@controllers/cities';
import { verifyToken } from '@middlewares/Token';
import cityFinder from '@middlewares/cityFinder';
import stateFinder from '@middlewares/stateFinder';

const cityRouter = express.Router();

cityRouter.get('/:id', verifyToken, cityFinder, cities.getById);
cityRouter.get('/:id/state', verifyToken, stateFinder, cities.getByStateId);

export default cityRouter;
