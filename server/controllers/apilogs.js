import models from "@models";
import ResponseController from "@helpers/response";
import randString from "@helpers/utilities";
import { v4 } from "uuid";

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
  static async getAll(req, res) {
    const apilog = {
      name: `${ApiLogsController.parameters.toLowerCase()}.getAll`,
      refid: randString(`${ApiLogsController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${ApiLogsController.parameters} retrieved successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const payload = await ApiLogs.findAll();

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${ApiLogsController.parameters} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${ApiLogsController.parameters} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
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
  static async getById(req, res) {
    const { apilog: payload } = req;

    const apilog = {
      name: `${ApiLogsController.parameters.toLowerCase()}.getById`,
      refid: randString(`${ApiLogsController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${ApiLogsController.parameter} retrieved successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${ApiLogsController.parameter} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${ApiLogsController.parameter} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${ApiLogsController.parameter} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Update a apilogs
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ApiLogsController
   */
  static async update(req, res) {
    const apilogg = {
      name: `${ApiLogsController.parameters.toLowerCase()}.update`,
      refid: randString(`${ApiLogsController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${ApiLogsController.parameter} updated successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { apilog } = req;
      const { id } = apilog;

      await ApiLogs.update(req.body, { returning: true, where: { id } });

      const payload = await ApiLogs.findAll();

      apilogg.resbody = JSON.stringify(payload);
      apilogg.reqendtime = Date.now();
      await ApiLogs.create({ ...apilogg });

      ResponseController.success(
        res,
        200,
        200,
        `${ApiLogsController.parameter} updated successfully`,
        payload
      );
    } catch (err) {
      apilogg.resbody = JSON.stringify(err);
      apilogg.httpstatuscode = 400;
      apilogg.statuscode = 400;
      apilogg.message = `${ApiLogsController.parameter} could not be updated`;
      apilogg.reqendtime = Date.now();
      await ApiLogs.create({ ...apilogg });

      ResponseController.error(
        res,
        400,
        400,
        `${ApiLogsController.parameter} could not be updated`,
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
  static async delete(req, res) {
    const apilog = {
      name: `${ApiLogsController.parameters.toLowerCase()}.delete`,
      refid: randString(`${ApiLogsController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${ApiLogsController.parameter} deleted successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { apilogs } = req;
      const { id } = apilogs;
      await ApiLogs.destroy({ where: { id } });
      const payload = await ApiLogs.findAll();

      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${ApiLogsController.parameter} deleted successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${ApiLogsController.parameter} could not be deleted`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${ApiLogsController.parameter} could not be deleted`,
        err
      );
    }
  }
}

ApiLogsController.parameter = "ApiLog";
ApiLogsController.parameters = "ApiLogs";

export default ApiLogsController;
