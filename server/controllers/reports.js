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
  Membership, Attendance, Training, Activity, Group, Freport, Zone, Branch
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
    try {
      const { errors, isValid } = await validMembership(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors,
        });
      }

      const { id: userid } = req.decoded;

      const payload = await Membership.create({
        userid,
        day,
        month,
        year,
        ...req.body,
      });

      return ResponseController.success(
        res,
        200,
        200,
        'Membership report submitted successfully',
        payload
      );
    } catch (err) {
      return ResponseController.error(
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
    try {
      const { errors, isValid } = await validAttendance(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors,
        });
      }

      const { id: userid } = req.decoded;

      const payload = await Attendance.create({
        userid,
        day,
        month,
        year,
        ...req.body,
      });

      return ResponseController.success(
        res,
        200,
        200,
        'Attendance submitted successfully',
        payload
      );
    } catch (err) {
      return ResponseController.error(
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
              year: y
            }
          },
        ],
      });

      const payload = ReportController.format(data);

      return ResponseController.success(
        res,
        200,
        200,
        'Attendance retrieved successfully',
        payload
      );
    } catch (err) {
      return ResponseController.error(
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
            }
          },
        ],
      });

      const payload = ReportController.formatBranch(data);

      return ResponseController.success(
        res,
        200,
        200,
        'Branch attendance retrieved successfully',
        payload
      );
    } catch (err) {
      return ResponseController.error(
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
                day: dd
              },
            },
          ],
        });

        const formatdata = ReportController.formatAttendance(d, v);

        return formatdata;
      });

      await Promise.all(payload);

      return ResponseController.success(
        res,
        200,
        200,
        'Synod attendance retrieved successfully',
        payload[1]
      );
    } catch (err) {
      return ResponseController.error(
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
    try {
      const { errors, isValid } = await validTraining(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors,
        });
      }

      const { id: userid } = req.decoded;

      const payload = await Training.create({
        userid,
        day,
        month,
        year,
        ...req.body,
      });

      return ResponseController.success(
        res,
        200,
        200,
        'Training report submitted successfully',
        payload
      );
    } catch (err) {
      return ResponseController.error(
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
    try {
      const { errors, isValid } = await validActivity(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors,
        });
      }

      const { id: userid } = req.decoded;

      const payload = await Activity.create({
        userid,
        day,
        month,
        year,
        ...req.body,
      });

      return ResponseController.success(
        res,
        200,
        200,
        'Activity report submitted successfully',
        payload
      );
    } catch (err) {
      return ResponseController.error(
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
    try {
      const { errors, isValid } = await validGroup(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors,
        });
      }

      const { id: userid } = req.decoded;

      const payload = await Group.create({
        userid,
        day,
        month,
        year,
        ...req.body,
      });

      return ResponseController.success(
        res,
        200,
        200,
        'Group report submitted successfully',
        payload
      );
    } catch (err) {
      return ResponseController.error(
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
    try {
      const { errors, isValid } = await validFreport(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors,
        });
      }

      const { id: userid } = req.decoded;

      const payload = await Freport.create({
        userid,
        day,
        month,
        year,
        ...req.body,
      });

      return ResponseController.success(
        res,
        200,
        200,
        'Fellowship report submitted successfully',
        payload
      );
    } catch (err) {
      return ResponseController.error(
        res,
        400,
        400,
        'Fellowship report submission failed',
        err
      );
    }
  }
}

export default ReportController;
