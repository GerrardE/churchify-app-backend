import express from 'express';
import states from '@controllers/states';
import { verifyToken } from '@middlewares/Token';
import stateFinder from '@middlewares/state.middleware';

const statesRouter = express.Router();

statesRouter.get('/:id', verifyToken, stateFinder, states.getById);
statesRouter.get('/:id/country', verifyToken, stateFinder, states.getByCountryId);

export default statesRouter;
