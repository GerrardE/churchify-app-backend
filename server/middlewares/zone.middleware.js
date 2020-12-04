import handlePermission from '@helpers/permission';
import ResponseController from '@helpers/response';
import models from '@models';

const { Zone } = models;

const zoneFinder = async (req, res, next) => {
  const { id } = req.params;
  let zone;
  try {
    zone = await Zone.findOne({ where: { id } });
    if (!zone) throw new Error();
  } catch (err) {
    return ResponseController.error(res, 404, 404, 'Zone does not exist', err);
  }

  req.zone = zone;
  next();
};

const zonePermission = async (req, res, next) => {
  const { role } = req.decoded;
  const { permissions } = role;

  try {
    await handlePermission(req, permissions, 'zone');
  } catch (err) {
    return ResponseController.error(res, 403, 403, 'You do not have enough permissions', err);
  }

  next();
};

export { zoneFinder, zonePermission };
