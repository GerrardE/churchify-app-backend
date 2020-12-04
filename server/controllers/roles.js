import validationResponse from '@validations/validationResponse';
import validRole from '@validations/role';
import models from '@models';

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

      res.status(201).json({
        status: 201,
        message: `${RoleController.parameter} created successfully`,
        payload,
      });
    } catch (err) {
      if (err.errors && err.errors[0].type === 'unique violation') {
        return res.status(400).json({
          status: 400,
          errors: validationResponse(err),
        });
      }

      res.status(400).json({
        status: 400,
        errors: `${RoleController.parameter} creation unsuccessful`,
      });
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

      return res.status(201).json({
        status: 201,
        message: 'Permission(s) assigned successfully',
        payload,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Permission(s) could not be assigned',
        message: err.original.detail,
      });
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

      await role.removePermissions(req.body.permission);

      return res.status(200).json({
        status: 200,
        message: 'Permission(s) unassigned successfully'
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Permission(s) could not be unassigned',
        message: err.original.detail,
      });
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
        include: {
          model: Permission,
          as: 'permissions',
          through: {
            attributes: ['name']
          }
        }
      });

      return res.status(200).json({
        status: 200,
        message: `${RoleController.parameters} retrieved successfully`,
        payload,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: `${RoleController.parameters} could not be retrieved`,
        err,
      });
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
        include: Permission,
      });

      return res.status(200).json({
        status: 200,
        message: `${RoleController.parameter} retrieved successfully`,
        payload,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: `${RoleController.parameter} could not be retrieved`,
        err,
      });
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
        return res.status(400).json({
          status: 400,
          errors,
        });
      }

      const { role } = req;
      const { id } = role;

      await Role.update(req.body, { returning: true, where: { id } });

      const payload = await Role.findAll();
      res.status(200).json({
        status: 200,
        message: `${RoleController.parameter} updated successfully`,
        payload,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: `${RoleController.parameter} could not be updated`,
      });
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

      res.status(200).json({
        status: 200,
        message: `${RoleController.parameter} deleted successfully`,
        payload,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: `${RoleController.parameter} could not be deleted`,
      });
    }
  }
}

RoleController.parameters = 'Roles';
RoleController.parameter = 'Role';

export default RoleController;
