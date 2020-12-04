import handlePermission from '@helpers/permission';
import ResponseController from '@helpers/response';
import models from '@models';

const { Category } = models;

const categoryFinder = async (req, res, next) => {
  const { id } = req.params;
  let category;
  try {
    category = await Category.findOne({ where: { id } });
    if (!category) throw new Error();
  } catch (err) {
    return ResponseController.error(res, 404, 404, 'Category does not exist', err);
  }

  req.category = category;
  next();
};

const categoryPermission = async (req, res, next) => {
  const { role } = req.decoded;
  const { permissions } = role;

  try {
    await handlePermission(req, permissions, 'category');
  } catch (err) {
    return ResponseController.error(res, 403, 403, 'You do not have enough permissions', err);
  }

  next();
};

export { categoryFinder, categoryPermission };
