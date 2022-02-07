import { v4 } from "uuid";
import randString from "@helpers/utilities";
import validationResponse from "@validations/validationResponse";
import validActivityType from "@validations/activitytype";
import models from "@models";
import ResponseController from "@helpers/response";

const { ActivityType, ApiLogs } = models;

/**
 *ActivityType Controller
 * @async
 * @class ActivityTypeController
 */
class ActivityTypeController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ActivityTypeController
   */
  static async create(req, res) {
    const apilog = {
      name: `${ActivityTypeController.parameters.toLowerCase()}.create`,
      refid: randString(`${ActivityTypeController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 201,
      statuscode: 201,
      message: `${ActivityTypeController.parameter} created successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = validActivityType(req.body);
      // Check Validation
      if (!isValid) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = "Error: invalid input";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        ResponseController.error(res, 400, 400, "Error: invalid input", errors);
      }

      const { id: userid } = req.decoded;

      const payload = await ActivityType.create({
        userid,
        ...req.body,
      });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        201,
        201,
        `${ActivityTypeController.parameter} created successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${ActivityTypeController.parameter} could not be created`;

      if (err.errors && err.errors[0].type === "unique violation") {
        apilog.message = JSON.stringify(validationResponse(err));
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        ResponseController.error(res, 400, 400, validationResponse(err), err);
      }

      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });
      ResponseController.error(
        res,
        400,
        400,
        `${ActivityTypeController.parameter} could not be created`,
        err
      );
    }
  }

  /**
   * Get all ActivityTypes
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof ActivityTypeController
   */
  static async getAll(req, res) {
    const apilog = {
      name: `${ActivityTypeController.parameters.toLowerCase()}.getAll`,
      refid: randString(`${ActivityTypeController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${ActivityTypeController.parameters} retrieved successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const payload = await ActivityType.findAll({
        order: [["name", "ASC"]]
      });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${ActivityTypeController.parameters} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${ActivityTypeController.parameters} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${ActivityTypeController.parameters} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Get An ActivityType
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof ActivityTypeController
   */
  static async getById(req, res) {
    const { activitytype: payload } = req;

    const apilog = {
      name: `${ActivityTypeController.parameters.toLowerCase()}.getById`,
      refid: randString(`${ActivityTypeController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${ActivityTypeController.parameter} retrieved successfully`,
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
        `${ActivityTypeController.parameter} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${ActivityTypeController.parameter} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${ActivityTypeController.parameter} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Update an ActivityType
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ActivityTypeController
   */
  static async update(req, res) {
    const apilog = {
      name: `${ActivityTypeController.parameters.toLowerCase()}.update`,
      refid: randString(`${ActivityTypeController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${ActivityTypeController.parameter} updated successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = validActivityType(req.body, true);
      // Check Validation
      if (!isValid) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = "Error: invalid input";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        ResponseController.error(res, 400, 400, "Error: invalid input", errors);
      }

      const { activitytype } = req;
      const { userid, id } = activitytype;

      await ActivityType.update(req.body, {
        returning: true,
        where: { id, userid },
      });

      const payload = await ActivityType.findAll({
        order: [["name", "ASC"]]
      });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${ActivityTypeController.parameter} updated successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${ActivityTypeController.parameter} could not be updated`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${ActivityTypeController.parameter} could not be updated`,
        err
      );
    }
  }

  /**
   * Delete an ActivityType
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ActivityTypeController
   */
  static async delete(req, res) {
    const apilog = {
      name: `${ActivityTypeController.parameters.toLowerCase()}.delete`,
      refid: randString(`${ActivityTypeController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${ActivityTypeController.parameter} deleted successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { activitytype } = req;
      const { id, userid } = activitytype;
      await ActivityType.destroy({ where: { id, userid } });
      const payload = await ActivityType.findAll({
        order: [["name", "ASC"]]
      });

      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${ActivityTypeController.parameter} deleted successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${ActivityTypeController.parameter} could not be deleted`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${ActivityTypeController.parameter} could not be deleted`,
        err
      );
    }
  }
}

ActivityTypeController.parameter = "ActivityType";
ActivityTypeController.parameters = "ActivityTypes";

export default ActivityTypeController;
