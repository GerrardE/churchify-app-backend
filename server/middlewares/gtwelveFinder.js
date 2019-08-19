import models from '@models';

const { Gtwelve } = models;

const gtwelveFinder = async (req, res, next) => {
  const { id } = req.params;
  const gtwelve = await Gtwelve.findOne({ where: { id } });

  if (!gtwelve) {
    return res.status(400).json({
      status: 404,
      errors: 'gtwelve does not exist'
    });
  }
  req.gtwelve = gtwelve;
  next();
};

const gtwelvePermission = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.decoded;

  const gtwelve = await Gtwelve.findOne({ where: { id, userId } });

  if (!gtwelve) {
    return res.status(400).json({
      status: 403,
      errors: 'You do not have enough permissions'
    });
  }

  req.gtwelve = gtwelve;
  next();
};

export { gtwelveFinder, gtwelvePermission };
