import { v4 } from "uuid";
import randString from "@helpers/utilities";
import validationResponse from "@validations/validationResponse";
import validFellowship from "@validations/fellowship";
import models from "@models";
import ResponseController from "@helpers/response";

const { Fellowship, ApiLogs } = models;

/**
 * Fellowship Controller
 * @async
 * @class FellowshipController
 */
class FellowshipController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof FellowshipController
   */
  static async create(req, res) {
    const apilog = {
      name: `${FellowshipController.parameters.toLowerCase()}.create`,
      refid: randString(`${FellowshipController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 201,
      statuscode: 201,
      message: `${FellowshipController.parameter} created successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = validFellowship(req.body);
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

      const payload = await Fellowship.create({ userid, ...req.body });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        201,
        201,
        `${FellowshipController.parameter} created successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${FellowshipController.parameter} could not be created`;

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
        `${FellowshipController.parameter} creation unsuccessful`,
        err
      );
    }
  }

  /**
   * Get all Fellowships
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof FellowshipController
   */
  static async getAll(req, res) {
    const apilog = {
      name: `${FellowshipController.parameters.toLowerCase()}.getAll`,
      refid: randString(`${FellowshipController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${FellowshipController.parameters} retrieved successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const payload = await Fellowship.findAll();

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${FellowshipController.parameters} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${FellowshipController.parameters} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${FellowshipController.parameters} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Get a fellowship
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof FellowshipController
   */
  static async getById(req, res) {
    const { fellowship: payload } = req;

    const apilog = {
      name: `${FellowshipController.parameters.toLowerCase()}.getById`,
      refid: randString(`${FellowshipController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${FellowshipController.parameter} retrieved successfully`,
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
        `${FellowshipController.parameter} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${FellowshipController.parameter} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        400,
        400,
        `${FellowshipController.parameter} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Update a Fellowship
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof FellowshipController
   */
  static async update(req, res) {
    const apilog = {
      name: `${FellowshipController.parameters.toLowerCase()}.update`,
      refid: randString(`${FellowshipController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${FellowshipController.parameter} updated successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = validFellowship(req.body, true);
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

      const { fellowship } = req;
      const { userid, id } = fellowship;

      await fellowship.update(req.body, {
        returning: true,
        where: { id, userid },
      });

      const payload = await Fellowship.findAll();

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${FellowshipController.parameter} updated successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${FellowshipController.parameter} could not be updated`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${FellowshipController.parameter} could not be updated`,
        err
      );
    }
  }

  /**
   * Delete a Fellowship
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof FellowshipController
   */
  static async delete(req, res) {
    const apilog = {
      name: `${FellowshipController.parameters.toLowerCase()}.delete`,
      refid: randString(`${FellowshipController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${FellowshipController.parameter} deleted successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { fellowship } = req;
      const { id, userid } = Fellowship;
      await fellowship.destroy({ where: { id, userid } });
      const payload = await Fellowship.findAll();

      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${FellowshipController.parameter} deleted successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${FellowshipController.parameter} could not be deleted`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        400,
        400,
        `${FellowshipController.parameter} could not be deleted`,
        err
      );
    }
  }
}

FellowshipController.parameter = "Fellowship";
FellowshipController.parameters = "Fellowships";

export default FellowshipController;
