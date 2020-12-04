import ResponseController from '@helpers/response';
import models from '@models';

const { Config } = models;

const configFinder = async (req, res, next) => {
  const { id } = req.params;
  let config;
  try {
    config = await Config.findOne({ where: { id } });
    if (!config) throw new Error();
  } catch (err) {
    return ResponseController.error(res, 404, 404, 'Config does not exist', err);
  }

  req.config = config;
  next();
};

const confFinder = async (req, res, next) => {
  const { name } = req.params;
  let config;
  try {
    config = await Config.findOne({ where: { name } });
    if (!config) throw new Error();
  } catch (err) {
    return ResponseController.error(res, 404, 404, 'Config does not exist', err);
  }

  req.config = config;
  next();
};

export {
  configFinder,
  confFinder
};
