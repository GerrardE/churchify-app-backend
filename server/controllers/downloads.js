import { v4 } from 'uuid';
import validationResponse from '@validations/validationResponse';
import validDownload from '@validations/download';
import models from '@models';
import ResponseController from '@helpers/response';
import randString from '@helpers/utilities';

const { Download, ApiLogs } = models;

/**
 * Download Controller
 * @async
 * @class DownloadController
 */
class DownloadController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof DownloadController
   */
  static async create(req, res) {
    const apilog = {
      name: `${DownloadController.parameters.toLowerCase()}.create`,
      refid: randString(`${DownloadController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 201,
      statuscode: 201,
      message: `${DownloadController.parameter} created successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    try {
      const { errors, isValid } = validDownload(req.body);
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

      const payload = await Download.create({ userid, ...req.body });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${DownloadController.parameter} created successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${DownloadController.parameter} could not be created`;

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
        `${DownloadController.parameter} could not be created`,
        err
      );
    }
  }

  /**
   * Get all Downloads
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof DownloadController
   */
  static async getAll(req, res) {
    const apilog = {
      name: `${DownloadController.parameters.toLowerCase()}.getAll`,
      refid: randString(`${DownloadController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 200,
      statuscode: 200,
      message: `${DownloadController.parameters} retrieved successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    try {
      const payload = await Download.findAll();

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${DownloadController.parameters} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${DownloadController.parameters} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${DownloadController.parameters} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Get a download
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof DownloadController
   */
  static async getById(req, res) {
    const { download: payload } = req;

    const apilog = {
      name: `${DownloadController.parameters.toLowerCase()}.getById`,
      refid: randString(`${DownloadController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 200,
      statuscode: 200,
      message: `${DownloadController.parameter} retrieved successfully`,
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
        `${DownloadController.parameter} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${DownloadController.parameter} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${DownloadController.parameter} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Update a Download
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof DownloadController
   */
  static async update(req, res) {
    const apilog = {
      name: `${DownloadController.parameters.toLowerCase()}.update`,
      refid: randString(`${DownloadController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 200,
      statuscode: 200,
      message: `${DownloadController.parameter} updated successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    try {
      const { errors, isValid } = validDownload(req.body, true);
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

      const { download } = req;
      const { userid, id } = download;

      await Download.update(req.body, {
        returning: true,
        where: { id, userid },
      });

      const payload = await Download.findAll();

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${DownloadController.parameter} updated successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${DownloadController.parameter} could not be updated`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${DownloadController.parameter} could not be updated`,
        err
      );
    }
  }

  /**
   * Delete an Download
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof DownloadController
   */
  static async delete(req, res) {
    const apilog = {
      name: `${DownloadController.parameters.toLowerCase()}.delete`,
      refid: randString(`${DownloadController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 200,
      statuscode: 200,
      message: `${DownloadController.parameter} deleted successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    try {
      const { download } = req;
      const { id, userid } = download;
      await Download.destroy({ where: { id, userid } });
      const payload = await Download.findAll();

      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${DownloadController.parameter} deleted successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${DownloadController.parameter} could not be deleted`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${DownloadController.parameter} could not be deleted`,
        err
      );
    }
  }
}

DownloadController.parameter = 'Download';
DownloadController.parameters = 'Downloads';

export default DownloadController;
