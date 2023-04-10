import ResponseController from "@helpers/response";
import validActivity from "@validations/activity";
import apiLogFactory from "@factories/apilogs";
import models from "@models";

const {
  Activity,
  ApiLogs,
} = models;

const today = new Date();
const day = today.getDay();
const month = today.getMonth();
const year = today.getFullYear();

/**
 * Activity Controller
 * @async
 * @class ActivityController
 */
class ActivityController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ActivityController
   */
  static async create(req, res, next) {
    const apilog = apiLogFactory(ActivityController, req, res, "create", "created successfully", 201, 201);

    try {
      const { errors, isValid } = await validActivity(req.body);
      // Check Validation
      if (!isValid) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = "Error: invalid input";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        return ResponseController.error(res, 400, 400, "Error: invalid input", errors);
      }

      const { id: userid } = req.decoded;

      const payload = await Activity.create({
        userid,
        day,
        month,
        year,
        ...req.body,
      });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        201,
        201,
        apilog.message,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${ActivityController.parameter} report submission failed`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(
        res,
        400,
        400,
        apilog.message,
        apilog.resbody
      );
    }
  }

  /**
   * Get all Activitys
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ActivityController
   */
  static async getAll(req, res, next) {
    const apilog = apiLogFactory(ActivityController, req, res, "getAll", "retrieved successfully", 200, 200);

    try {
      const payload = await Activity.findAll();

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        200,
        200,
        apilog.message,
        payload
      );
    } catch (err) {
      apilog.resbody = err.toString();
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${ActivityController.parameters} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(
        res,
        400,
        400,
        apilog.message,
        err
      );
    }
  }

  /**
   * Get a Activity
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ActivityController
   */
  static async getById(req, res, next) {
    const { activity: payload } = req;

    const apilog = apiLogFactory(ActivityController, req, res, "getById", "retrieved successfully", 200, 200);

    try {
      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        200,
        200,
        apilog.message,
        payload
      );
    } catch (err) {
      apilog.resbody = err.toString();
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${ActivityController.parameter} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        400,
        400,
        apilog.message,
        err
      );
    }
  }

  /**
   * Update Activity
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ActivityController
   */
  static async update(req, res, next) {
    const apilog = apiLogFactory(ActivityController, req, res, "update", "updated successfully", 200, 200);

    try {
      const { errors, isValid } = validActivity(req.body, true);
      // Check Validation
      if (!isValid) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = "Error: invalid input";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        return ResponseController.error(res, 400, 400, "Error: invalid input", errors);
      }

      const { activity } = req;
      const { userid, id } = activity;

      await Activity.update(req.body, {
        returning: true,
        where: { id, userid },
      });

      const payload = await Activity.findAll();

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        200,
        200,
        apilog.message,
        payload
      );
    } catch (err) {
      apilog.resbody = err.toString();
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${ActivityController.parameter} could not be updated`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(
        res,
        400,
        400,
        apilog.message,
        err
      );
    }
  }

  /**
   * Delete Activity
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ActivityController
   */
  static async delete(req, res, next) {
    const apilog = apiLogFactory(ActivityController, req, res, "delete", "deleted successfully", 200, 200);

    try {
      const { activity } = req;
      const { id, userid } = activity;
      await Activity.destroy({ where: { id, userid } });
      const payload = await Activity.findAll();

      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        200,
        200,
        apilog.message,
        payload
      );
    } catch (err) {
      apilog.resbody = err.toString();
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${ActivityController.parameter} could not be deleted`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        400,
        400,
        apilog.message,
        err
      );
    }
  }
}

ActivityController.parameter = "Activity";
ActivityController.parameters = "Activitys";

export default ActivityController;
