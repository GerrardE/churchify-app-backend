import models from '@models';

const { Event } = models;

const eventFinder = async (req, res, next) => {
  const { id } = req.params;
  const event = await Event.findOne({ where: { id } });

  if (!event) {
    return res.status(400).json({
      status: 404,
      errors: 'Event does not exist'
    });
  }
  req.event = event;
  next();
};

const eventPermission = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.decoded;

  const event = await Event.findOne({ where: { id, userId } });

  if (!event) {
    return res.status(400).json({
      status: 403,
      errors: 'You do not have enough permissions'
    });
  }

  req.event = event;
  next();
};

export { eventFinder, eventPermission };
