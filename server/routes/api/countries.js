import express from 'express';
import country from '@controllers/countries';
import countryFinder from '@middlewares/country.middleware';

const countryRouter = express.Router();

countryRouter.get('/', country.getAll);
countryRouter.get('/:id', countryFinder, country.getById);
countryRouter.get('/:name/country', country.getByName);

export default countryRouter;
