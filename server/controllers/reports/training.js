import ResponseController from "@helpers/response";
import validTraining from "@validations/training";
import apiLogFactory from "@factories/apilogs";
import models from "@models";

const {
  Training,
  ApiLogs,
} = models;

const today = new Date();
const day = today.getDay();
const month = today.getMonth();
const year = today.getFullYear();

/**
 * Training Controller
 * @async
 * @class TrainingController
 */
class TrainingController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof TrainingController
   */
  static async create(req, res, next) {
    const apilog = apiLogFactory(TrainingController, req, res, "create", "created successfully", 201, 201);

    try {
      const { errors, isValid } = await validTraining(req.body);
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

      const payload = await Training.create({
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
      apilog.message = `${TrainingController.parameter} report submission failed`;
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
   * Get all Trainings
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof TrainingController
   */
  static async getAll(req, res, next) {
    const apilog = apiLogFactory(TrainingController, req, res, "getAll", "retrieved successfully", 200, 200);

    try {
      const payload = await Training.findAll({
        order: [["createdAt", "DESC"]],
        attributes: ["id", "date", "converts", "trainees", "createdAt", "updatedAt"],
        include: [
          {
            attributes: ["firstname"],
            model: models.User,
            as: "usertraining",
          },
          {
            attributes: ["name"],
            model: models.Branch,
            as: "branchtraining",
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
      apilog.message = `${TrainingController.parameters} could not be retrieved`;
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
   * Get a Training
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof TrainingController
   */
  static async getById(req, res, next) {
    const { training: payload } = req;

    const apilog = apiLogFactory(TrainingController, req, res, "getById", "retrieved successfully", 200, 200);

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
      apilog.message = `${TrainingController.parameter} could not be retrieved`;
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
   * Update Training
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof TrainingController
   */
  static async update(req, res, next) {
    const apilog = apiLogFactory(TrainingController, req, res, "update", "updated successfully", 200, 200);

    try {
      const { errors, isValid } = validTraining(req.body, true);
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

      const { training } = req;
      const { userid, id } = training;

      await Training.update(req.body, {
        returning: true,
        where: { id, userid },
      });

      const payload = await Training.findAll();

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
      apilog.message = `${TrainingController.parameter} could not be updated`;
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
   * Delete Training
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof TrainingController
   */
  static async delete(req, res, next) {
    const apilog = apiLogFactory(TrainingController, req, res, "delete", "deleted successfully", 200, 200);

    try {
      const { training } = req;
      const { id, userid } = training;
      await Training.destroy({ where: { id, userid } });
      const payload = await Training.findAll();

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
      apilog.message = `${TrainingController.parameter} could not be deleted`;
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

TrainingController.parameter = "Training";
TrainingController.parameters = "Trainings";

export default TrainingController;
