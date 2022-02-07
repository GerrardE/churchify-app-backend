import { v4 } from "uuid";
import randString from "@helpers/utilities";
import validationResponse from "@validations/validationResponse";
import validTrainingType from "@validations/trainingtype";
import models from "@models";
import ResponseController from "@helpers/response";

const { TrainingType, ApiLogs } = models;

/**
 * TrainingType Controller
 * @async
 * @class TrainingTypeController
 */
class TrainingTypeController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof TrainingTypeController
   */
  static async create(req, res) {
    const apilog = {
      name: `${TrainingTypeController.parameters.toLowerCase()}.create`,
      refid: randString(`${TrainingTypeController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 201,
      statuscode: 201,
      message: `${TrainingTypeController.parameter} created successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = validTrainingType(req.body);
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

      const payload = await TrainingType.create({
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
        `${TrainingTypeController.parameter} created successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${TrainingTypeController.parameter} could not be created`;

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
        `${TrainingTypeController.parameter} could not be created`,
        err
      );
    }
  }

  /**
   * Get all TrainingTypes
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof TrainingTypeController
   */
  static async getAll(req, res) {
    const apilog = {
      name: `${TrainingTypeController.parameters.toLowerCase()}.getAll`,
      refid: randString(`${TrainingTypeController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${TrainingTypeController.parameters} retrieved successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const payload = await TrainingType.findAll({
        order: [["name", "ASC"]]
      });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${TrainingTypeController.parameters} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${TrainingTypeController.parameters} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${TrainingTypeController.parameters} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Get An TrainingType
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof TrainingTypeController
   */
  static async getById(req, res) {
    const { trainingtype: payload } = req;

    const apilog = {
      name: `${TrainingTypeController.parameters.toLowerCase()}.getById`,
      refid: randString(`${TrainingTypeController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${TrainingTypeController.parameter} retrieved successfully`,
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
        `${TrainingTypeController.parameter} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${TrainingTypeController.parameter} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${TrainingTypeController.parameter} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Update an TrainingType
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof TrainingTypeController
   */
  static async update(req, res) {
    const apilog = {
      name: `${TrainingTypeController.parameters.toLowerCase()}.update`,
      refid: randString(`${TrainingTypeController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${TrainingTypeController.parameter} updated successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = validTrainingType(req.body, true);
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

      const { trainingtype } = req;
      const { userid, id } = trainingtype;

      await TrainingType.update(req.body, {
        returning: true,
        where: { id, userid },
      });

      const payload = await TrainingType.findAll({
        order: [["name", "ASC"]]
      });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${TrainingTypeController.parameter} updated successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${TrainingTypeController.parameter} could not be updated`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${TrainingTypeController.parameter} could not be updated`,
        err
      );
    }
  }

  /**
   * Delete an TrainingType
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof TrainingTypeController
   */
  static async delete(req, res) {
    const apilog = {
      name: `${TrainingTypeController.parameters.toLowerCase()}.delete`,
      refid: randString(`${TrainingTypeController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${TrainingTypeController.parameter} deleted successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { trainingtype } = req;
      const { id, userid } = trainingtype;
      await TrainingType.destroy({ where: { id, userid } });
      const payload = await TrainingType.findAll({
        order: [["name", "ASC"]]
      });

      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${TrainingTypeController.parameter} deleted successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${TrainingTypeController.parameter} could not be deleted`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${TrainingTypeController.parameter} could not be deleted`,
        err
      );
    }
  }
}

TrainingTypeController.parameter = "TrainingType";
TrainingTypeController.parameters = "TrainingTypes";

export default TrainingTypeController;
