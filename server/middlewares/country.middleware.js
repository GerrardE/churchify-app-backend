import ResponseController from '@helpers/response';
import models from '@models';

const { Country } = models;

const countryFinder = async (req, res, next) => {
  const { id } = req.params;
  let country;
  try {
    country = await Country.findOne({ where: { id } });
    if (!country) throw new Error();
  } catch (err) {
    return ResponseController.error(res, 404, 404, 'Country does not exist', err);
  }

  req.country = country;
  next();
};

export default countryFinder;
