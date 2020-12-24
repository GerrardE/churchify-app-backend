import handlePermission from '@helpers/permission';
import ResponseController from '@helpers/response';
import models from '@models';

const { Event } = models;

const eventFinder = async (req, res, next) => {
  const { id } = req.params;
  let event;
  try {
    event = await Event.findOne({ where: { id } });
    if (!event) throw new Error();
  } catch (err) {
    return ResponseController.error(res, 404, 404, 'Event does not exist', err);
  }

  req.event = event;
  next();
};

const eventPermission = async (req, res, next) => {
  try {
    const { role } = req.decoded;
    const { permissions } = role;
    await handlePermission(req, permissions, 'event');
  } catch (err) {
    return ResponseController.error(res, 403, 403, 'You do not have enough permissions', err);
  }

  next();
};

export { eventFinder, eventPermission };
