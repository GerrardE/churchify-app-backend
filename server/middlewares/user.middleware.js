import handlePermission from '@helpers/permission';
import ResponseController from '@helpers/response';
import models from '@models';

const { User, Role } = models;

const userFinder = async (req, res, next) => {
  const { id } = req.params;
  let user;
  try {
    user = await User.findOne({
      where: { id },
      attributes: ['id', 'firstname', 'lastname', 'email', 'phone', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Role,
          as: 'roles',
          attributes: ['name']
        }
      ]
    });
    if (!user) throw new Error();
  } catch (err) {
    return ResponseController.error(res, 404, 404, 'User does not exist', err);
  }

  req.user = user;
  next();
};

const userPermission = async (req, res, next) => {
  try {
    const { role } = req.decoded;
    const { permissions } = role;
    await handlePermission(req, permissions, 'user');
  } catch (err) {
    return ResponseController.error(res, 403, 403, 'You do not have enough permissions', err);
  }

  next();
};

export { userFinder, userPermission };
