import { v4 } from 'uuid';
import randString from '@helpers/utilities';
import sequelize from 'sequelize';
import validMembership from '@validations/membership';
import validAttendance from '@validations/attendance';
import validTraining from '@validations/training';
import validActivity from '@validations/activity';
import validGroup from '@validations/group';
import validFreport from '@validations/freport';
import ResponseController from '@helpers/response';
import models from '@models';

const {
  Membership,
  Attendance,
  Training,
  Activity,
  Group,
  Freport,
  Zone,
  Branch,
  ApiLogs,
} = models;

const today = new Date();
const day = today.getDay();
const month = today.getMonth();
const year = today.getFullYear();

/**
 * Report Controller
 * @async
 * @class ReportController
 */
class ReportController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ReportController
   */
  static async membership(req, res) {
    const apilog = {
      name: `${ReportController.parameters.toLowerCase()}.membership`,
      refid: randString(`${ReportController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 201,
      statuscode: 201,
      message: 'Membership report submitted successfully',
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    try {
      const { errors, isValid } = await validMembership(req.body);
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

      ResponseController.success(
        res,
        201,
        201,
        'Membership report submitted successfully',
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = 'Membership report submission failed';
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        'Membership report submission failed',
        err
      );
    }
  }

  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ReportController
   */
  static async attendance(req, res) {
    const apilog = {
      name: `${ReportController.parameters.toLowerCase()}.attendance`,
      refid: randString(`${ReportController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 201,
      statuscode: 201,
      message: 'Attendance submitted successfully',
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    try {
      const { errors, isValid } = await validAttendance(req.body);
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

      const payload = await Attendance.create({
        userid,
        day,
        month,
        year,
        ...req.body,
      });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        201,
        201,
        'Attendance submitted successfully',
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = 'Attendance submission failed';
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        'Attendance submission failed',
        err
      );
    }
  }

  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ReportController
   */
  static async getZoneAttendance(req, res) {
    const apilog = {
      name: `${ReportController.parameters.toLowerCase()}.getZoneAttendance`,
      refid: randString(`${ReportController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 200,
      statuscode: 200,
      message: 'Attendance retrieved successfully',
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    const { day: d = day, year: y = year } = req.body;

    try {
      const data = await Zone.findAll({
        attributes: ['id', 'name'],
        include: [
          {
            model: Attendance,
            as: 'zoneattendance',
            attributes: [
              [
                sequelize.literal(
                  'COALESCE(men, 0) + COALESCE(women, 0) + COALESCE(children, 0)'
                ),
                'total',
              ],
            ],
            where: {
              day: d,
              year: y,
            },
          },
        ],
      });

      const payload = ReportController.format(data);

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        'Attendance retrieved successfully',
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = 'Attendance could not be retrieved';
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        'Attendance could not be retrieved',
        err
      );
    }
  }

  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ReportController
   */
  static async getBranchAttendance(req, res) {
    const apilog = {
      name: `${ReportController.parameters.toLowerCase()}.getBranchAttendance`,
      refid: randString(`${ReportController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 200,
      statuscode: 200,
      message: 'Branch attendance retrieved successfully',
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    const { day: d = day, month: m = month, year: y = year } = req.body;

    try {
      const data = await Branch.findAll({
        attributes: ['id', 'name'],
        include: [
          {
            model: Attendance,
            as: 'branchattendance',
            attributes: [
              'men',
              'women',
              'children',
              [
                sequelize.literal(
                  'COALESCE(men, 0) + COALESCE(women, 0) + COALESCE(children, 0)'
                ),
                'total',
              ],
            ],
            where: {
              day: d,
              month: Number(m),
              year: Number(y),
            },
          },
        ],
      });

      const payload = ReportController.formatBranch(data);

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        'Branch attendance retrieved successfully',
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = 'Branch attendance could not be retrieved';
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        'Branch attendance could not be retrieved',
        err
      );
    }
  }

  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ReportController
   */
  static async getSynodAttendance(req, res) {
    const apilog = {
      name: `${ReportController.parameters.toLowerCase()}.getSynodAttendance`,
      refid: randString(`${ReportController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 200,
      statuscode: 200,
      message: 'Synod attendance retrieved successfully',
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    try {
      const { years, dd } = req.body;

      const payload = Object.values(years).map((v) => {
        const d = models.Zone.findAll({
          attributes: ['id', 'name'],
          include: [
            {
              model: models.Attendance,
              as: 'zoneattendance',
              attributes: [
                [
                  sequelize.literal(
                    'COALESCE(men, 0) + COALESCE(women, 0) + COALESCE(children, 0)'
                  ),
                  'total',
                ],
              ],
              where: {
                year: v,
                day: dd,
              },
            },
          ],
        });

        const formatdata = ReportController.formatAttendance(d, v);

        return formatdata;
      });

      await Promise.all(payload);

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        'Synod attendance retrieved successfully',
        payload[1]
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = 'Synod attendance could not be retrieved';
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        'Synod attendance could not be retrieved',
        err
      );
    }
  }

  /**
   * @param {*} data - object
   * @param {*} y - number
   * @return {json} Returns json object
   * @memberof ReportController
   */
  static formatAttendance(data, y) {
    const r = data.map((d) => {
      const result = {};

      result.id = d.id;

      result.name = d.name;

      const reducer = (accumulator, currentvalue) => accumulator + currentvalue.dataValues.total;

      result.zoneattendance = d.zoneattendance.reduce(reducer, 0);

      result.year = y;

      return result;
    });

    return r;
  }

  /**
   * @param {*} data - object
   * @return {json} Returns json object
   * @memberof ReportController
   */
  static format(data) {
    const r = data.map((d) => {
      const result = {};

      result.id = d.id;

      result.name = d.name;

      const reducer = (accumulator, currentvalue) => accumulator + currentvalue.dataValues.total;

      result.zoneattendance = d.zoneattendance.reduce(reducer, 0);

      return result;
    });

    return r;
  }

  /**
   * @param {*} data - object
   * @return {json} Returns json object
   * @memberof ReportController
   */
  static formatBranch(data) {
    const r = data.map((d) => {
      const result = {};

      result.id = d.id;

      result.name = d.name;

      const reducer = (accumulator, currentvalue) => accumulator + currentvalue.dataValues.total;

      result.men = d.branchattendance[0].men;
      result.women = d.branchattendance[0].women;
      result.children = d.branchattendance[0].children;

      result.branchattendance = d.branchattendance.reduce(reducer, 0);

      return result;
    });

    return r;
  }

  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ReportController
   */
  static async training(req, res) {
    const apilog = {
      name: `${ReportController.parameters.toLowerCase()}.training`,
      refid: randString(`${ReportController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 201,
      statuscode: 201,
      message: 'Training report submitted successfully',
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    try {
      const { errors, isValid } = await validTraining(req.body);
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

      ResponseController.success(
        res,
        201,
        201,
        'Training report submitted successfully',
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = 'Training report submission failed';
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        'Training report submission failed',
        err
      );
    }
  }

  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ReportController
   */
  static async activity(req, res) {
    const apilog = {
      name: `${ReportController.parameters.toLowerCase()}.activity`,
      refid: randString(`${ReportController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 201,
      statuscode: 201,
      message: 'Activity report submitted successfully',
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    try {
      const { errors, isValid } = await validActivity(req.body);
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

      const payload = await Activity.create({
        userid,
        day,
        month,
        year,
        ...req.body,
      });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        201,
        201,
        'Activity report submitted successfully',
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = 'Activity report submission failed';
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        'Activity report submission failed',
        err
      );
    }
  }

  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ReportController
   */
  static async group(req, res) {
    const apilog = {
      name: `${ReportController.parameters.toLowerCase()}.group`,
      refid: randString(`${ReportController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 201,
      statuscode: 201,
      message: 'Group report submitted successfully',
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    try {
      const { errors, isValid } = await validGroup(req.body);
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

      const payload = await Group.create({
        userid,
        day,
        month,
        year,
        ...req.body,
      });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        201,
        201,
        'Group report submitted successfully',
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = 'Group report submission failed';
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        'Group report submission failed',
        err
      );
    }
  }

  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ReportController
   */
  static async freport(req, res) {
    const apilog = {
      name: `${ReportController.parameters.toLowerCase()}.freport`,
      refid: randString(`${ReportController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 201,
      statuscode: 201,
      message: 'Fellowship report submitted successfully',
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    try {
      const { errors, isValid } = await validFreport(req.body);
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

      ResponseController.success(
        res,
        201,
        201,
        'Fellowship report submitted successfully',
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = 'Fellowship report submission failed';
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        'Fellowship report submission failed',
        err
      );
    }
  }
}

ReportController.parameter = 'Report';
ReportController.parameters = 'Reports';

export default ReportController;
