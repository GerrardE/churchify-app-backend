import validationResponse from '@validations/validationResponse';
import validPermission from '@validations/permission';
import models from '@models';

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
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const payload = await Permission.create({ ...req.body });

      res.status(201).json({
        status: 201,
        message: `${PermissionController.parameter} created successfully`,
        payload
      });
    } catch (err) {
      if (err.errors && err.errors[0].type === 'unique violation') {
        return res.status(400).json({
          status: 400,
          errors: validationResponse(err)
        });
      }

      res.status(400).json({
        status: 400,
        errors: `${PermissionController.parameter} creation unsuccessful`
      });
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

      return res.status(200).json({
        status: 200,
        message: `${PermissionController.parameters} retrieved successfully`,
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: `${PermissionController.parameters} could not be retrieved`,
        err,
      });
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

      return res.status(200).json({
        status: 200,
        message: `${PermissionController.parameter} retrieved successfully`,
        payload,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: `${PermissionController.parameter} could not be retrieved`,
        err,
      });
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
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const { permission } = req;
      const { id } = permission;

      await Permission.update(req.body, { returning: true, where: { id } });

      const payload = await Permission.findOne({ where: { id } });

      res.status(200).json({
        status: 200,
        message: `${PermissionController.parameter} updated successfully`,
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: `${PermissionController.parameter} could not be updated`
      });
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
        message: `${PermissionController.parameter} deleted successfully`
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: `${PermissionController.parameter} could not be deleted`
      });
    }
  }
}

PermissionController.parameters = 'Permissions';
PermissionController.parameter = 'Permission';

export default PermissionController;
