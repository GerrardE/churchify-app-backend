import models from '@models';

const { City } = models;

const cityFinder = async (req, res, next) => {
  const { id } = req.params;
  Number(id);
  let city;

  try {
    city = await City.findOne({ where: { id } });
  } catch (err) {
    return res.status(400).json({
      status: 404,
      errors: 'City does not exist',
      err
    });
  }

  req.city = city;
  next();
};

export default cityFinder;
