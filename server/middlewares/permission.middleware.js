import handlePermission from '@helpers/permission';
import ResponseController from '@helpers/response';
import models from '@models';
import { userFindAll } from './user.middleware';

const { Permission } = models;

const permissionFinder = async (req, res, next) => {
  const { id } = req.params;
  let permission;
  try {
    permission = await Permission.findOne({ where: { id } });
    if (!permission) throw new Error();
  } catch (err) {
    return ResponseController.error(res, 404, 404, 'Permission does not exist', err);
  }

  req.permission = permission;
  next();
};

const permissionPermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, 'permission');
  } catch (err) {
    return ResponseController.error(res, 403, 403, 'You do not have enough permissions', err);
  }

  next();
};

export { permissionFinder, permissionPermission };
