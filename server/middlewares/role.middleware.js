import handlePermission from '@helpers/permission';
import ResponseController from '@helpers/response';
import models from '@models';
import { userFindAll } from './user.middleware';

const { Role } = models;

const roleFinder = async (req, res, next) => {
  const { id } = req.params;
  let role;
  try {
    role = await Role.findOne({ where: { id } });
    if (!role) throw (role);
  } catch (err) {
    return ResponseController.error(res, 404, 404, 'Role does not exist', err);
  }

  req.role = role;
  next();
};

const rolePermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, 'role');
  } catch (err) {
    return ResponseController.error(res, 403, 403, 'You do not have enough permissions', err);
  }

  next();
};

export { roleFinder, rolePermission };
