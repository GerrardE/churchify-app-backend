import handlePermission from '@helpers/permission';
import ResponseController from '@helpers/response';
import models from '@models';

const { Preacher } = models;

const preacherFinder = async (req, res, next) => {
  const { id } = req.params;
  let preacher;
  try {
    preacher = await Preacher.findOne({ where: { id } });
    if (!preacher) throw new Error();
  } catch (err) {
    return ResponseController.error(res, 404, 404, 'Preacher does not exist', err);
  }

  req.preacher = preacher;
  next();
};

const preacherPermission = async (req, res, next) => {
  try {
    const { role } = req.decoded;
    const { permissions } = role;
    await handlePermission(req, permissions, 'preacher');
  } catch (err) {
    return ResponseController.error(res, 403, 403, 'You do not have enough permissions', err);
  }

  next();
};

export { preacherFinder, preacherPermission };
