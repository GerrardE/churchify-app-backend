import { v4 } from 'uuid';
import randString from '@helpers/utilities';
import handlePermission from '@helpers/permission';
import ResponseController from '@helpers/response';
import models from '@models';
import { userFindAll } from './user.middleware';

const { Role, ApiLogs } = models;

const roleFinder = async (req, res, next) => {
  const { id } = req.params;
  let role;
  try {
    role = await Role.findOne({ where: { id } });
    if (!role) throw (role);
  } catch (err) {
    const apilog = {
      name: 'roleFinder',
      refid: randString('ROLE'),
      reqbody: JSON.stringify(req.body),
      resbody: JSON.stringify(err),
      httpstatuscode: 404,
      statuscode: 404,
      message: 'Role does not exist',
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: Date.now(),
    };

    await ApiLogs.create({ ...apilog });
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
    const apilog = {
      name: 'rolePermission',
      refid: randString('ROLE'),
      reqbody: JSON.stringify(req.body),
      resbody: JSON.stringify(err),
      httpstatuscode: 403,
      statuscode: 403,
      message: 'You do not have enough permissions',
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: Date.now(),
    };

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(res, 403, 403, 'You do not have enough permissions', err);
  }

  next();
};

export { roleFinder, rolePermission };
