import handlePermission from '@helpers/permission';
import ResponseController from '@helpers/response';
import models from '@models';
import { userFindAll } from './user.middleware';

const { Fellowship } = models;

const fellowshipFinder = async (req, res, next) => {
  const { id } = req.params;
  let fellowship;
  try {
    fellowship = await Fellowship.findOne({ where: { id } });
    if (!fellowship) throw new Error();
  } catch (err) {
    return ResponseController.error(res, 404, 404, 'Fellowship does not exist', err);
  }

  req.fellowship = fellowship;
  next();
};

const fellowshipPermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, 'fellowship');
  } catch (err) {
    return ResponseController.error(res, 403, 403, 'You do not have enough permissions', err);
  }

  next();
};

export { fellowshipFinder, fellowshipPermission };
