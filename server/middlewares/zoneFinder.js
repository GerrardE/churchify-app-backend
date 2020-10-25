import models from '@models';

const { Zone } = models;

const zoneFinder = async (req, res, next) => {
  const { id } = req.params;
  const zone = await Zone.findOne({ where: { id } });

  if (!zone) {
    return res.status(400).json({
      status: 404,
      errors: 'zone does not exist'
    });
  }
  req.zone = zone;
  next();
};

const zonePermission = async (req, res, next) => {
  const { id } = req.params;
  const { id: userid } = req.decoded;

  const zone = await Zone.findOne({ where: { id, userid } });

  if (!zone) {
    return res.status(400).json({
      status: 403,
      errors: 'You do not have enough permissions'
    });
  }

  req.zone = zone;
  next();
};

export { zoneFinder, zonePermission };
