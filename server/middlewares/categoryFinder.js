import models from '@models';

const { Category } = models;

const categoryFinder = async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findOne({ where: { id } });

  if (!category) {
    return res.status(400).json({
      status: 404,
      errors: 'category does not exist'
    });
  }
  req.category = category;
  next();
};

const categoryPermission = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.decoded;

  const category = await Category.findOne({ where: { id, userId } });

  if (!category) {
    return res.status(400).json({
      status: 403,
      errors: 'You do not have enough permissions'
    });
  }

  req.category = category;
  next();
};

export { categoryFinder, categoryPermission };
