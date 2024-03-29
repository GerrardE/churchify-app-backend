import validationResponse from "@validations/validationResponse";
import validBranch from "@validations/branch";
import ResponseController from "@helpers/response";
import models from "@models";
import randString from "@helpers/utilities";
import { v4 } from "uuid";

const { Branch, ApiLogs, Zone } = models;

/**
 * Branch Controller
 * @async
 * @class BranchController
 */
class BranchController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof BranchController
   */
  static async create(req, res, next) {
    const apilog = {
      name: `${BranchController.parameters.toLowerCase()}.create`,
      refid: randString(`${BranchController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 201,
      statuscode: 201,
      message: `${BranchController.parameter} created successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = validBranch(req.body);
      // Check Validation
      if (!isValid) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = "Error: invalid input";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });

        return ResponseController.error(
          res,
          400,
          400,
          "Error: invalid input",
          errors
        );
      }

      const payload = await Branch.create({ ...req.body });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        201,
        201,
        `${BranchController.parameter} created successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${BranchController.parameter} could not be created`;

      if (err.errors && err.errors[0].type === "unique violation") {
        apilog.message = JSON.stringify(validationResponse(err));
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });

        return ResponseController.error(
          res,
          400,
          400,
          validationResponse(err),
          err
        );
      }

      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(
        res,
        400,
        400,
        `${BranchController.parameter} could not be created`,
        err
      );
    }
  }

  /**
   * Get all branches
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof BranchController
   */
  static async getAll(req, res, next) {
    const apilog = {
      name: `${BranchController.parameters.toLowerCase()}.getAll`,
      refid: randString(`${BranchController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${BranchController.parameters} retrieved successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const payload = await Branch.findAll({
        order: [["name", "ASC"]],
      });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        200,
        200,
        `${BranchController.parameters} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${BranchController.parameters} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(
        res,
        400,
        400,
        `${BranchController.parameter} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Get a branch
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof ZoneController
   */
  static async getById(req, res, next) {
    const { branch: payload } = req;

    const apilog = {
      name: `${BranchController.parameter.toLowerCase()}.getById`,
      refid: randString(`${BranchController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${BranchController.parameter} retrieved successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        200,
        200,
        `${BranchController.parameter} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${BranchController.parameter} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(
        res,
        400,
        400,
        `${BranchController.parameter} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Get a branch by zoneId
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof ZoneController
   */
  static async getByZoneId(req, res, next) {
    const apilog = {
      name: `${BranchController.parameters.toLowerCase()}.getByZoneId`,
      refid: randString(`${BranchController.parameters.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${BranchController.parameters} retrieved successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    const { id } = req.params;

    try {
      const zone = await Zone.findOne({
        where: { id },
        attributes: [],
        include: [
          {
            attributes: ["id", "name"],
            model: Branch,
            as: "branches",
          },
        ],
      });

      const payload = zone.dataValues.branches;

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        200,
        200,
        `${BranchController.parameters} retrieved successfully`,
        payload ? payload : []
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${BranchController.parameters} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(
        res,
        400,
        400,
        `${BranchController.parameters} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Update a Branch
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof BranchController
   */
  static async update(req, res, next) {
    const apilog = {
      name: `${BranchController.parameters.toLowerCase()}.update`,
      refid: randString(`${BranchController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${BranchController.parameter} updated successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = validBranch(req.body, true);
      // Check Validation
      if (!isValid) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = "Error: invalid input";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });

        return ResponseController.error(
          res,
          400,
          400,
          "Error: invalid input",
          errors
        );
      }

      const { branch } = req;
      const { id } = branch;

      const payload = await Branch.update(req.body, {
        returning: true,
        where: { id },
      });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        200,
        200,
        `${BranchController.parameter} updated successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${BranchController.parameter} could not be updated`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(
        res,
        400,
        400,
        `${BranchController.parameter} could not be updated`,
        err
      );
    }
  }

  /**
   * Delete a Branch
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof BranchController
   */
  static async delete(req, res, next) {
    const apilog = {
      name: `${BranchController.parameters.toLowerCase()}.delete`,
      refid: randString(`${BranchController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${BranchController.parameter} deleted successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { branch } = req;
      const { id } = branch;
      await Branch.destroy({ where: { id } });
      const payload = await Branch.findAll({
        order: [["name", "ASC"]],
      });

      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        200,
        200,
        `${BranchController.parameter} deleted successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${BranchController.parameter} could not be deleted`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(
        res,
        400,
        400,
        `${BranchController.parameter} could not be deleted`,
        err
      );
    }
  }
}

BranchController.parameter = "Branch";
BranchController.parameters = "Branches";

export default BranchController;
