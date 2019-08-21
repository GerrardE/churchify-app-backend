import models from '@models';

const { Preacher } = models;

const preacherFinder = async (req, res, next) => {
  const { id } = req.params;
  const preacher = await Preacher.findOne({ where: { id } });

  if (!preacher) {
    return res.status(400).json({
      status: 404,
      errors: 'preacher does not exist'
    });
  }
  req.preacher = preacher;
  next();
};

const preacherPermission = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.decoded;

  const preacher = await Preacher.findOne({ where: { id, userId } });

  if (!preacher) {
    return res.status(400).json({
      status: 403,
      errors: 'You do not have enough permissions'
    });
  }

  req.preacher = preacher;
  next();
};

export { preacherFinder, preacherPermission };
