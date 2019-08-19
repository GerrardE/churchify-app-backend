import models from '@models';

const { Branch } = models;

const branchFinder = async (req, res, next) => {
  const { id } = req.params;
  const branch = await Branch.findOne({ where: { id } });

  if (!branch) {
    return res.status(400).json({
      status: 404,
      errors: 'branch does not exist'
    });
  }
  req.branch = branch;
  next();
};

const branchPermission = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.decoded;

  const branch = await Branch.findOne({ where: { id, userId } });

  if (!branch) {
    return res.status(400).json({
      status: 403,
      errors: 'You do not have enough permissions'
    });
  }

  req.branch = branch;
  next();
};

export { branchFinder, branchPermission };
