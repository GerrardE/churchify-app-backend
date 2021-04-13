import { v4 } from 'uuid';
import randString from '@helpers/utilities';
import validPreacher from '@validations/preacher';
import models from '@models';
import ResponseController from '@helpers/response';
import validationResponse from '@validations/validationResponse';

const { Preacher, ApiLogs } = models;

/**
 * Preacher Controller
 * @async
 * @class PreacherController
 */
class PreacherController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof PreacherController
   */
  static async create(req, res) {
    const apilog = {
      name: `${PreacherController.parameters.toLowerCase()}.create`,
      refid: randString(`${PreacherController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 201,
      statuscode: 201,
      message: `${PreacherController.parameter} created successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    try {
      const { errors, isValid } = validPreacher(req.body);
      // Check Validation
      if (!isValid) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = 'Error: invalid input';
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        ResponseController.error(res, 400, 400, 'Error: invalid input', errors);
      }

      const { id: userid } = req.decoded;

      const payload = await Preacher.create({ userid, ...req.body });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        201,
        201,
        `${PreacherController.parameter} created successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${PreacherController.parameter} could not be created`;

      if (err.errors && err.errors[0].type === 'unique violation') {
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
        `${PreacherController.parameter} creation unsuccessful`,
        err
      );
    }
  }

  /**
   * Get all Preachers
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof PreacherController
   */
  static async getAll(req, res) {
    const apilog = {
      name: `${PreacherController.parameters.toLowerCase()}.getAll`,
      refid: randString(`${PreacherController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 200,
      statuscode: 200,
      message: `${PreacherController.parameters} retrieved successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    try {
      const payload = await Preacher.findAll();

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${PreacherController.parameters} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${PreacherController.parameters} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${PreacherController.parameters} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Get a preacher
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof PreacherController
   */
  static async getById(req, res) {
    const { preacher: payload } = req;

    const apilog = {
      name: `${PreacherController.parameters.toLowerCase()}.getById`,
      refid: randString(`${PreacherController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 200,
      statuscode: 200,
      message: `${PreacherController.parameter} retrieved successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    try {
      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${PreacherController.parameter} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${PreacherController.parameter} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${PreacherController.parameter} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Update a preacher
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof PreacherController
   */
  static async update(req, res) {
    const apilog = {
      name: `${PreacherController.parameters.toLowerCase()}.update`,
      refid: randString(`${PreacherController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 200,
      statuscode: 200,
      message: `${PreacherController.parameter} updated successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    try {
      const { errors, isValid } = validPreacher(req.body);
      // Check Validation
      if (!isValid) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = 'Error: invalid input';
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        ResponseController.error(res, 400, 400, 'Error: invalid input', errors);
      }

      const { preacher } = req;
      const { userid, id } = preacher;

      await Preacher.update(req.body, {
        returning: true,
        where: { id, userid },
      });

      const payload = await Preacher.findAll();

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${PreacherController.parameter} updated successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${PreacherController.parameter} could not be updated`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${PreacherController.parameter} could not be updated`,
        err
      );
    }
  }

  /**
   * Delete a preacher
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof PreacherController
   */
  static async delete(req, res) {
    const apilog = {
      name: `${PreacherController.parameters.toLowerCase()}.delete`,
      refid: randString(`${PreacherController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 200,
      statuscode: 200,
      message: `${PreacherController.parameter} deleted successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    try {
      const { preacher } = req;
      const { id, userid } = preacher;
      await Preacher.destroy({ where: { id, userid } });
      const payload = await Preacher.findAll();

      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${PreacherController.parameter} deleted successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${PreacherController.parameter} could not be deleted`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${PreacherController.parameter} could not be deleted`,
        err
      );
    }
  }
}

PreacherController.parameter = 'Preacher';
PreacherController.parameters = 'Preachers';

export default PreacherController;
