import validationResponse from '@validations/validationResponse';
import validRole from '@validations/role';
import models from '@models';
import ResponseController from '@helpers/response';

const { Role, Permission } = models;

/**
 * Role Controller
 * @async
 * @class RoleController
 */
class RoleController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof RoleController
   */
  static async create(req, res) {
    try {
      const { errors, isValid } = validRole(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors,
        });
      }

      const payload = await Role.create({ ...req.body });

      ResponseController.success(
        res,
        201,
        201,
        `${RoleController.parameter} created successfully`,
        payload
      );
    } catch (err) {
      if (err.errors && err.errors[0].type === 'unique violation') {
        ResponseController.error(res, 400, 400, validationResponse(err), err);
      }

      ResponseController.error(
        res,
        400,
        400,
        `${RoleController.parameter} could not be created`,
        err
      );
    }
  }

  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof RoleController
   */
  static async assignpermissions(req, res) {
    try {
      const { role } = req;

      const payload = await role.addPermissions(req.body.permission);

      ResponseController.success(
        res,
        200,
        200,
        'Permission(s) assigned successfully, Please logout and login again',
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        'Permission(s) could not be assigned',
        err
      );
    }
  }

  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof RoleController
   */
  static async unassignpermissions(req, res) {
    try {
      const { role } = req;

      const payload = await role.removePermissions(req.body.permission);

      ResponseController.success(
        res,
        200,
        200,
        'Permission(s) unassigned successfully, Please logout and login again',
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        'Permission(s) could not be unassigned',
        err
      );
    }
  }

  /**
   * Get all Roles
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof RoleController
   */
  static async getAll(req, res) {
    try {
      const payload = await Role.findAll({
        // attributes: ['id', 'name', 'notes']
      });

      ResponseController.success(
        res,
        200,
        200,
        `${RoleController.parameters} retrieved successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${RoleController.parameters} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Get a role
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof RoleController
   */
  static async getById(req, res) {
    try {
      const { role } = req;
      const { id } = role;
      const payload = await Role.findOne({
        where: { id },
        attributes: ['id', 'name', 'notes', 'createdAt', 'updatedAt'],
        include: {
          model: Permission,
          as: 'permissions',
          attributes: ['id', 'name'],
        },
      });

      ResponseController.success(
        res,
        200,
        200,
        `${RoleController.parameter} retrieved successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${RoleController.parameter} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Update a Role
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof RoleController
   */
  static async update(req, res) {
    try {
      const { errors, isValid } = validRole(req.body);
      // Check Validation
      if (!isValid) {
        ResponseController.error(res, 400, 400, 'Error: invalid input', errors);
      }

      const { role } = req;
      const { id } = role;

      await Role.update(req.body, { returning: true, where: { id } });

      const payload = await Role.findAll();

      ResponseController.success(
        res,
        200,
        200,
        `${RoleController.parameter} updated successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${RoleController.parameter} could not be updated`,
        err
      );
    }
  }

  /**
   * Delete a Role
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof RoleController
   */
  static async delete(req, res) {
    try {
      const { role } = req;
      const { id } = role;
      await Role.destroy({ where: { id } });
      const payload = await Role.findAll();

      ResponseController.success(
        res,
        200,
        200,
        `${RoleController.parameter} deleted successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${RoleController.parameter} could not be deleted`,
        err
      );
    }
  }
}

RoleController.parameters = 'Roles';
RoleController.parameter = 'Role';

export default RoleController;
