import express from 'express';
import events from '@controllers/events';
import trim from '@middlewares/trim';
import { verifyToken } from '@middlewares/Token';
import { eventFinder, eventPermission } from '@middlewares/eventFinder';

const eventRouter = express.Router();

eventRouter.post('/', verifyToken, trim, events.create);
eventRouter.get('/', verifyToken, events.getAll);
eventRouter.put('/:id', verifyToken, eventFinder, eventPermission, events.update);
eventRouter.delete('/:id', verifyToken, eventFinder, eventPermission, events.delete);

export default eventRouter;
