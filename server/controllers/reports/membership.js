import ResponseController from "@helpers/response";
import validMembership from "@validations/membership";
import apiLogFactory from "@factories/apilogs";
import models from "@models";

const {
  Membership,
  ApiLogs,
} = models;

const today = new Date();
const day = today.getDay();
const month = today.getMonth();
const year = today.getFullYear();

/**
 * Membership Controller
 * @async
 * @class MembershipController
 */
class MembershipController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof MembershipController
   */
  static async create(req, res, next) {
    const apilog = apiLogFactory(MembershipController, req, res, "create", "created successfully", 201, 201);

    try {
      const { errors, isValid } = await validMembership(req.body);
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

      const payload = await Membership.create({
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
      apilog.message = `${MembershipController.parameter} report submission failed`;
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
   * Get all Memberships
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof MembershipController
   */
  static async getAll(req, res, next) {
    const apilog = apiLogFactory(MembershipController, req, res, "getAll", "retrieved successfully", 200, 200);

    try {
      const payload = await Membership.findAll({
        limit: 100,
        order: [["createdAt", "DESC"]],
        attributes: ["id", "date", "adults", "children", "tithers", "newmembers", "createdAt", "updatedAt"],
        include: [
          {
            attributes: ["firstname"],
            model: models.User,
            as: "usermembership",
          },
          {
            attributes: ["name"],
            model: models.Branch,
            as: "branchmembership",
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
      apilog.message = `${MembershipController.parameters} could not be retrieved`;
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
   * Get a Membership
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof MembershipController
   */
  static async getById(req, res, next) {
    const { membership: payload } = req;

    const apilog = apiLogFactory(MembershipController, req, res, "getById", "retrieved successfully", 200, 200);

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
      apilog.message = `${MembershipController.parameter} could not be retrieved`;
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
   * Update Membership
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof MembershipController
   */
  static async update(req, res, next) {
    const apilog = apiLogFactory(MembershipController, req, res, "update", "updated successfully", 200, 200);

    try {
      const { errors, isValid } = validMembership(req.body, true);
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

      const { membership } = req;
      const { userid, id } = membership;

      await Membership.update(req.body, {
        returning: true,
        where: { id, userid },
      });

      const payload = await Membership.findAll({
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
      apilog.resbody = err.toString();
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${MembershipController.parameter} could not be updated`;
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
   * Delete Membership
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof MembershipController
   */
  static async delete(req, res, next) {
    const apilog = apiLogFactory(MembershipController, req, res, "delete", "deleted successfully", 200, 200);

    try {
      const { membership } = req;
      const { id, userid } = membership;
      await Membership.destroy({ where: { id, userid } });
      const payload = await Membership.findAll({
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
      apilog.resbody = err.toString();
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${MembershipController.parameter} could not be deleted`;
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

MembershipController.parameter = "Membership";
MembershipController.parameters = "Memberships";

export default MembershipController;
