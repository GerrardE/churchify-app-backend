import validationResponse from '@validations/validationResponse';
import validConfig from '@validations/config';
import models from '@models';
import ResponseController from '@helpers/response';

const { Config } = models;

/**
 * Config Controller
 * A configuration is an array of objects required for rendering certain-
 * information depending on type e.g settings, etc
 * @async
 * @class ConfigController
 */
class ConfigController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ConfigController
   */
  static async create(req, res) {
    try {
      const { errors, isValid } = validConfig(req.body);
      // Check Validation
      if (!isValid) {
        return ResponseController.error(res, 400, 400, 'Error: invalid input', errors);
      }

      const payload = await Config.create({ ...req.body });

      return ResponseController.success(
        res,
        201,
        201,
        `${ConfigController.parameter} created successfully`,
        payload
      );
    } catch (err) {
      if (err.errors && err.errors[0].type === 'unique violation') {
        return ResponseController.error(
          res,
          400,
          400,
          validationResponse(err),

          err
        );
      }

      return ResponseController.error(
        res,
        400,
        400,
        `${ConfigController.parameter} could not be created`,
        err
      );
    }
  }

  /**
   * Get configs
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof ConfigController
   */
  static async getAll(req, res) {
    const payload = await Config.findAll();

    return ResponseController.success(
      res,
      200,
      200,
      `${ConfigController.parameter} retrieved successfully`,
      payload
    );
  }

  /**
   * Get a config item
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof ConfigController
   */
  static async getById(req, res) {
    const { config } = req;
    const { id } = config;
    const payload = await Config.findOne({ where: { id } });

    return ResponseController.success(
      res,
      200,
      200,
      `${ConfigController.parameter} retrieved successfully`,
      payload
    );
  }

  /**
   * Get a config item
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof ConfigController
   */
  static async getByName(req, res) {
    const { config } = req;
    const { name } = config;
    const payload = await Config.findOne({ where: { name } });

    return ResponseController.success(
      res,
      200,
      200,
      `${ConfigController.parameter} retrieved successfully`,
      payload
    );
  }

  /**
   * Update a config
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ConfigController
   */
  static async update(req, res) {
    try {
      const { errors, isValid } = validConfig(req.body);
      // Check Validation
      if (!isValid) {
        return ResponseController.error(res, 400, 400, 'Error: invalid input', errors);
      }

      const { config } = req;
      const { id } = config;

      await Config.update(req.body, { returning: true, where: { id } });

      const payload = await Config.findAll();

      return ResponseController.success(
        res,
        200,
        200,
        `${ConfigController.parameter} updated successfully`,
        payload
      );
    } catch (err) {
      return ResponseController.error(
        res,
        400,
        400,
        `${ConfigController.parameter} could not be updated`,
        err
      );
    }
  }

  /**
   * Delete a config
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ConfigController
   */
  static async delete(req, res) {
    try {
      const { config } = req;
      const { id } = config;
      await Config.destroy({ where: { id } });
      const payload = await Config.findAll();

      return ResponseController.success(
        res,
        200,
        200,
        `${ConfigController.parameter} deleted successfully`,
        payload
      );
    } catch (err) {
      return ResponseController.error(
        res,
        400,
        400,
        `${ConfigController.parameter} could not be deleted`,
        err
      );
    }
  }
}

ConfigController.parameter = 'Config';
ConfigController.parameters = 'Configs';

export default ConfigController;
