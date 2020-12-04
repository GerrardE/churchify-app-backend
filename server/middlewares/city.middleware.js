import ResponseController from '@helpers/response';
import models from '@models';

const { City } = models;

const cityFinder = async (req, res, next) => {
  const { id } = req.params;
  let city;
  try {
    city = await City.findOne({ where: { id } });
    if (!city) throw new Error();
  } catch (err) {
    return ResponseController.error(res, 404, 404, 'City does not exist', err);
  }

  req.city = city;
  next();
};

export default cityFinder;
