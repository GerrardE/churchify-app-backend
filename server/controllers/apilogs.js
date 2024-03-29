import models from "@models";
import ResponseController from "@helpers/response";

const { ApiLogs } = models;

/**
 * ApiLogs Controller
 * ApiLogs is used to log all calls to api endpoints on the app
 * @async
 * @class ApiLogsController
 */
class ApiLogsController {
  /**
   * Get apilogs
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof ApiLogsController
   */
  static async getAll(req, res, next) {
    try {
      const payload = await ApiLogs.findAll({
        limit: 100,
        attributes: ["id", "name", "refid", "httpstatuscode", "message"],
        order: [["createdAt", "DESC"]]
      });

      return ResponseController.success(
        res,
        200,
        200,
        `${ApiLogsController.parameters} retrieved successfully`,
        payload
      );
    } catch (err) {
      return ResponseController.error(
        res,
        400,
        400,
        `${ApiLogsController.parameter} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Get an apilogs item
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof ApiLogsController
   */
  static async getById(req, res, next) {
    const { apilog: payload } = req;

    try {
      return ResponseController.success(
        res,
        200,
        200,
        `${ApiLogsController.parameter} retrieved successfully`,
        payload
      );
    } catch (err) {
      return ResponseController.error(
        res,
        400,
        400,
        `${ApiLogsController.parameter} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Delete a apilogs
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ApiLogsController
   */
  static async delete(req, res, next) {
    try {
      const { apilog } = req;
      const { id } = apilog;
      await ApiLogs.destroy({ where: { id } });

      const payload = await ApiLogs.findAll({
        limit: 100,
        order: [['createdAt', 'DESC']]
      });

      return ResponseController.success(
        res,
        200,
        200,
        `${ApiLogsController.parameter} deleted successfully`,
        payload
      );
    } catch (err) {
      return ResponseController.error(
        res,
        400,
        400,
        `${ApiLogsController.parameter} could not be deleted`,
        err
      );
    }
  }
}

ApiLogsController.parameter = "Apilog";
ApiLogsController.parameters = "Apilogs";

export default ApiLogsController;
