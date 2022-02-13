import { v4 } from "uuid";
import ResponseController from "@helpers/response";
import randString from "@helpers/utilities";
import models from "@models";

const { City, ApiLogs } = models;

/**
 * City Controller
 * @async
 * @class CityController
 */
class CityController {
  /**
   * Get a City item by id
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof CityController
   */
  static async getById(req, res, next) {
    const { city: payload } = req;

    const apilog = {
      name: `${CityController.parameters.toLowerCase()}.getById`,
      refid: randString(`${CityController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${CityController.parameter} retrieved successfully`,
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
        `${CityController.parameter} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${CityController.parameter} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${CityController.parameter} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Get City items by state id
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof CityController
   */
  static async getByStateId(req, res, next) {
    const apilog = {
      name: `${CityController.parameters.toLowerCase()}.getByStateId`,
      refid: randString(`${CityController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${CityController.parameters} retrieved successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { state } = req;
      const { id } = state;
      const payload = await City.findAll({ 
        where: { state_id: id },
        order: [["name", "ASC"]]
      });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${CityController.parameters} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${CityController.parameters} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${CityController.parameters} could not be retrieved`,
        err
      );
    }
  }
}

CityController.parameter = "City";
CityController.parameters = "Cities";

export default CityController;
