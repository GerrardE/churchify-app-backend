import ResponseController from "@helpers/response";
import validFreport from "@validations/freport";
import apiLogFactory from "@factories/apilogs";
import models from "@models";

const {
  Freport,
  ApiLogs,
} = models;

const today = new Date();
const day = today.getDay();
const month = today.getMonth();
const year = today.getFullYear();

/**
 * Freport Controller
 * @async
 * @class FreportController
 */
class FreportController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof FreportController
   */
  static async create(req, res, next) {
    const apilog = apiLogFactory(FreportController, req, res, "create", "created successfully", 201, 201);

    try {
      const { errors, isValid } = await validFreport(req.body);
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

      const payload = await Freport.create({
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
      apilog.message = `${FreportController.parameter} report submission failed`;
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
   * Get all Freports
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof FreportController
   */
  static async getAll(req, res, next) {
    const apilog = apiLogFactory(FreportController, req, res, "getAll", "retrieved successfully", 200, 200);

    try {
      const payload = await Freport.findAll({
        order: [["createdAt", "DESC"]],
        attributes: ["id", "date", "newcells", "totalcells", "attendance", "createdAt", "updatedAt"],
        include: [
          {
            attributes: ["firstname"],
            model: models.User,
            as: "userfreport",
          },
          {
            attributes: ["name"],
            model: models.Branch,
            as: "branchfreport",
          },
        ],
      });

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
      apilog.message = `${FreportController.parameters} could not be retrieved`;
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
   * Get a Freport
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof FreportController
   */
  static async getById(req, res, next) {
    const { freport: payload } = req;

    const apilog = apiLogFactory(FreportController, req, res, "getById", "retrieved successfully", 200, 200);

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
      apilog.message = `${FreportController.parameter} could not be retrieved`;
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
   * Update Freport
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof FreportController
   */
  static async update(req, res, next) {
    const apilog = apiLogFactory(FreportController, req, res, "update", "updated successfully", 200, 200);

    try {
      const { errors, isValid } = validFreport(req.body, true);
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

      const { freport } = req;
      const { userid, id } = freport;

      await Freport.update(req.body, {
        returning: true,
        where: { id, userid },
      });

      const payload = await Freport.findAll();

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
      apilog.message = `${FreportController.parameter} could not be updated`;
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
   * Delete Freport
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof FreportController
   */
  static async delete(req, res, next) {
    const apilog = apiLogFactory(FreportController, req, res, "delete", "deleted successfully", 200, 200);

    try {
      const { freport } = req;
      const { id, userid } = freport;
      await Freport.destroy({ where: { id, userid } });
      const payload = await Freport.findAll();

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
      apilog.message = `${FreportController.parameter} could not be deleted`;
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

FreportController.parameter = "Freport";
FreportController.parameters = "Freports";

export default FreportController;
