import { v4 } from "uuid";
import randString from "@helpers/utilities";
import ResponseController from "@helpers/response";
import models from "@models";

const { State, ApiLogs } = models;

/**
 * State Controller
 * @async
 * @class StateController
 */
class StateController {
  /**
   * Get a state item by id
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof StateController
   */
  static async getById(req, res, next) {
    const { state: payload } = req;

    const apilog = {
      name: `${StateController.parameters.toLowerCase()}.getById`,
      refid: randString(`${StateController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${StateController.parameter} retrieved successfully`,
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
        `${StateController.parameter} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${StateController.parameters} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${StateController.parameters} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Get a state item by country id
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof StateController
   */
  static async getByCountryId(req, res, next) {
    const { state } = req;
    const { id } = state;
    const payload = await State.findAll({ where: { country_id: id },
      order: [["name", "ASC"]]
    });

    const apilog = {
      name: `${StateController.parameters.toLowerCase()}.getByCountryId`,
      refid: randString(`${StateController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${StateController.parameters} retrieved successfully`,
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
        `${StateController.parameters} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${StateController.parameters} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${StateController.parameters} could not be retrieved`,
        err
      );
    }
  }
}

StateController.parameter = "State";
StateController.parameters = "States";

export default StateController;
