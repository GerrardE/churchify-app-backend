import express from 'express';
import country from '@controllers/countries';
import { verifyToken } from '@middlewares/Token';
import countryFinder from '@middlewares/country.middleware';

const countryRouter = express.Router();

countryRouter.get('/', verifyToken, country.getAll);
countryRouter.get('/:id', verifyToken, countryFinder, country.getById);
countryRouter.get('/:name/country', verifyToken, country.getByName);

export default countryRouter;
