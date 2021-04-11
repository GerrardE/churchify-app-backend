import validationResponse from '@validations/validationResponse';
import models from '@models';
import ResponseController from '@helpers/response';

const { ApiLog } = models;

/**
 * ApiLog Controller
 * ApiLog is used to log all calls to api endpoints on the app
 * @async
 * @class ApiLogController
 */
class ApiLogController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ApiLogController
   */
  static async create(req, res) {
    try {
      const payload = await ApiLog.create({ ...req.body });

      ResponseController.success(
        res,
        201,
        201,
        `${ApiLogController.parameter} created successfully`,
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
        `${ApiLogController.parameter} could not be created`,
        err
      );
    }
  }

  /**
   * Get apilogs
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof ApiLogController
   */
  static async getAll(req, res) {
    const payload = await ApiLog.findAll();

    ResponseController.success(
      res,
      200,
      200,
      `${ApiLogController.parameter} retrieved successfully`,
      payload
    );
  }

  /**
   * Get an apilog item
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof ApiLogController
   */
  static async getById(req, res) {
    const { apilog } = req;
    const { id } = apilog;
    const payload = await ApiLog.findOne({ where: { id } });

    ResponseController.success(
      res,
      200,
      200,
      `${ApiLogController.parameter} retrieved successfully`,
      payload
    );
  }

  /**
   * Update a apilog
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ApiLogController
   */
  static async update(req, res) {
    try {
      const { apilog } = req;
      const { id } = apilog;

      await ApiLog.update(req.body, { returning: true, where: { id } });

      const payload = await ApiLog.findAll();

      ResponseController.success(
        res,
        200,
        200,
        `${ApiLogController.parameter} updated successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${ApiLogController.parameter} could not be updated`,
        err
      );
    }
  }

  /**
   * Delete a apilog
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ApiLogController
   */
  static async delete(req, res) {
    try {
      const { apilog } = req;
      const { id } = apilog;
      await ApiLog.destroy({ where: { id } });
      const payload = await ApiLog.findAll();

      ResponseController.success(
        res,
        200,
        200,
        `${ApiLogController.parameter} deleted successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${ApiLogController.parameter} could not be deleted`,
        err
      );
    }
  }
}

ApiLogController.parameter = 'ApiLog';
ApiLogController.parameters = 'ApiLogs';

export default ApiLogController;
