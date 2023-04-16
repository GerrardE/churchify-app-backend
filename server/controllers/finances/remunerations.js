import validationResponse from "@validations/validationResponse";
import { validRemuneration } from "@validations/finances";
import apiLogFactory from "@factories/apilogs";
import models from "@models";
import ResponseController from "@helpers/response";

const { Remuneration, ApiLogs } = models;

/**
 * Remuneration Controller
 * @async
 * @class RemunerationController
 */
class RemunerationController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof RemunerationController
   */
  static async create(req, res, next) {
    const apilog = apiLogFactory(RemunerationController, req, res, "create", "created successfully", 201, 201);

    try {
      const { errors, isValid } = validRemuneration(req.body);
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

      const payload = await Remuneration.create({ userid, ...req.body });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        201,
        201,
        `${RemunerationController.parameter} created successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${RemunerationController.parameter} could not be created`;

      if (err.errors && err.errors[0].type === "unique violation") {
        apilog.message = JSON.stringify(validationResponse(err));
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        return ResponseController.error(res, 400, 400, validationResponse(err), err);
      }

      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(
        res,
        400,
        400,
        `${RemunerationController.parameter} creation unsuccessful`,
        err
      );
    }
  }

  /**
   * Get all Remunerations
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof RemunerationController
   */
  static async getAll(req, res, next) {
    const apilog = apiLogFactory(RemunerationController, req, res, "getAll", "retrieved successfully", 200, 200);

    try {
      const payload = await Remuneration.findAll({
        limit: 100
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
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${RemunerationController.parameters} could not be retrieved`;
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
   * Get a Remuneration
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof RemunerationController
   */
  static async getById(req, res, next) {
    const { remuneration: payload } = req;

    const apilog = apiLogFactory(RemunerationController, req, res, "getById", "retrieved successfully", 200, 200);

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
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${RemunerationController.parameter} could not be retrieved`;
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
   * Update Remuneration
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof RemunerationController
   */
  static async update(req, res, next) {
    const apilog = apiLogFactory(RemunerationController, req, res, "update", "updated successfully", 200, 200);

    try {
      const { errors, isValid } = validRemuneration(req.body, true);
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

      const { remuneration } = req;
      const { userid, id } = remuneration;

      await Remuneration.update(req.body, {
        returning: true,
        where: { id, userid },
      });

      const payload = await Remuneration.findAll({
        limit: 100
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
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${RemunerationController.parameter} could not be updated`;
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
   * Delete Remuneration
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof RemunerationController
   */
  static async delete(req, res, next) {
    const apilog = apiLogFactory(RemunerationController, req, res, "delete", "deleted successfully", 200, 200);

    try {
      const { remuneration } = req;
      const { id, userid } = remuneration;
      await Remuneration.destroy({ where: { id, userid } });
      const payload = await Remuneration.findAll({
        limit: 100
      });

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
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${RemunerationController.parameter} could not be deleted`;
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

RemunerationController.parameter = "Remuneration";
RemunerationController.parameters = "Remunerations";

export default RemunerationController;
