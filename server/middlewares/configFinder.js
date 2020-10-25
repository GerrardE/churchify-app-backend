import models from '@models';

const { Config } = models;

const configFinder = async (req, res, next) => {
  const { id } = req.params;
  const config = await Config.findOne({ where: { id } });

  if (!config) {
    return res.status(400).json({
      status: 404,
      errors: 'config does not exist'
    });
  }
  req.config = config;
  next();
};

export default configFinder;
