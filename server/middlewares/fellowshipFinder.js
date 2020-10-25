import models from '@models';

const { Fellowship } = models;

const fellowshipFinder = async (req, res, next) => {
  const { id } = req.params;
  const fellowship = await Fellowship.findOne({ where: { id } });

  if (!fellowship) {
    return res.status(400).json({
      status: 404,
      errors: 'fellowship does not exist'
    });
  }
  req.fellowship = fellowship;
  next();
};

const fellowshipPermission = async (req, res, next) => {
  const { id } = req.params;
  const { id: userid } = req.decoded;

  const fellowship = await Fellowship.findOne({ where: { id, userid } });

  if (!fellowship) {
    return res.status(400).json({
      status: 403,
      errors: 'You do not have enough permissions'
    });
  }

  req.fellowship = fellowship;
  next();
};

export { fellowshipFinder, fellowshipPermission };
