import validationResponse from '@validations/validationResponse';
import validPermission from '@validations/permission';
import models from '@models';
import ResponseController from '@helpers/response';

const { Permission } = models;

/**
 * Permission Controller
 * @async
 * @class PermissionController
 */
class PermissionController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof PermissionController
   */
  static async create(req, res) {
    try {
      const { errors, isValid } = validPermission(req.body);
      // Check Validation
      if (!isValid) {
        ResponseController.error(res, 400, 400, 'Error: invalid input', errors);
      }

      const payload = await Permission.create({ ...req.body });

      ResponseController.success(
        res,
        201,
        201,
        `${PermissionController.parameter} created successfully`,
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
        `${PermissionController.parameter} creation unsuccessful`,
        err
      );
    }
  }

  /**
   * Get all Permissions
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof PermissionController
   */
  static async getAll(req, res) {
    try {
      const payload = await Permission.findAll();

      ResponseController.success(
        res,
        200,
        200,
        `${PermissionController.parameters} retrieved successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${PermissionController.parameters} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Get a permission
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof PermissionController
   */
  static async getById(req, res) {
    try {
      const { permission } = req;
      const { id } = permission;
      const payload = await Permission.findOne({ where: { id } });

      ResponseController.success(
        res,
        200,
        200,
        `${PermissionController.parameter} retrieved successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${PermissionController.parameter} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Update a Permission
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof PermissionController
   */
  static async update(req, res) {
    try {
      const { errors, isValid } = validPermission(req.body);
      // Check Validation
      if (!isValid) {
        ResponseController.error(res, 400, 400, 'Error: invalid input', errors);
      }

      const { permission } = req;
      const { id } = permission;

      await Permission.update(req.body, { returning: true, where: { id } });

      const payload = await Permission.findOne({ where: { id } });

      ResponseController.success(
        res,
        200,
        200,
        `${PermissionController.parameter} updated successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${PermissionController.parameter} could not be updated`,
        err
      );
    }
  }

  /**
   * Delete a Permission
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof PermissionController
   */
  static async delete(req, res) {
    try {
      const { permission } = req;
      const { id } = permission;
      await Permission.destroy({ where: { id } });

      res.status(200).json({
        status: 200,
        message: `${PermissionController.parameter} deleted successfully`,
      });
      ResponseController.success(
        res,
        200,
        200,
        `${PermissionController.parameter} deleted successfully`,
        {}
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${PermissionController.parameter} could not be deleted`,
        err
      );
    }
  }
}

PermissionController.parameters = 'Permissions';
PermissionController.parameter = 'Permission';

export default PermissionController;
