import handlePermission from '@helpers/permission';
import ResponseController from '@helpers/response';
import models from '@models';

const { Branch } = models;

const branchFinder = async (req, res, next) => {
  const { id } = req.params;
  let branch;
  try {
    branch = await Branch.findOne({ where: { id } });
    if (!branch) throw new Error();
  } catch (err) {
    return ResponseController.error(res, 404, 404, 'Branch does not exist', err);
  }

  req.branch = branch;
  next();
};

const branchPermission = async (req, res, next) => {
  try {
    const { role } = req.decoded;
    const { permissions } = role;
    await handlePermission(req, permissions, 'branch');
  } catch (err) {
    return ResponseController.error(res, 403, 403, 'You do not have enough permissions', err);
  }

  next();
};

export { branchFinder, branchPermission };
