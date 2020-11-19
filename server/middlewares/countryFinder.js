import models from '@models';

const { Country } = models;

const countryFinder = async (req, res, next) => {
  const { id } = req.params;
  Number(id);
  const country = await Country.findOne({ where: { id } });

  if (!country) {
    return res.status(400).json({
      status: 404,
      errors: 'Country does not exist'
    });
  }
  req.country = country;
  next();
};

export default countryFinder;
