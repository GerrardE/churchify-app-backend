import validationResponse from '@validations/validationResponse';
import validConfig from '@validations/config';
import models from '@models';

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
        return res.status(400).json({
          status: 400,
          errors,
        });
      }
      
      const payload = await Config.create({ ...req.body });

      res.status(201).json({
        status: 201,
        message: 'Config created successfully',
        payload,
      });
    } catch (err) {
      console.log(err);
      if (err.errors && err.errors[0].type === 'unique violation') {
        return res.status(400).json({
          status: 400,
          errors: validationResponse(err),
        });
      }

      res.status(400).json({
        status: 400,
        errors: 'Config creation unsuccessful',
      });
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

    return res.status(200).json({
      status: 200,
      message: 'Configs retrieved successfully',
      payload,
    });
  }

  /**
   * Get a config item
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof ConfigController
   */
  static async getOne(req, res) {
    const { config } = req;
    const { id } = config;
    const payload = await Config.findOne({ where: { id } });

    return res.status(200).json({
      status: 200,
      message: 'Config retrieved successfully',
      payload,
    });
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
        return res.status(400).json({
          status: 400,
          errors,
        });
      }

      const { config } = req;
      const { id } = config;

      await Config.update(req.body, { returning: true, where: { id } });

      const payload = await Config.findAll();
      res.status(200).json({
        status: 200,
        message: 'Config updated successfully',
        payload,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Config could not be updated',
      });
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

      res.status(200).json({
        status: 200,
        message: 'Config deleted successfully',
        payload,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Config could not be deleted',
      });
    }
  }
}

export default ConfigController;
