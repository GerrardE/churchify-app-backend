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
  Membership, Attendance, Training, Activity, Group, Freport
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
        userid, day, month, year, ...req.body
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
        userid, day, month, year, ...req.body
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
  static async getSynodAttendance(req, res) {
    try {
      const {
        dd, yyyy
      } = req.body;

      const payload = await models.Zone.findAll({
        attributes: ['id', 'name'],
        include: [{
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
            day: dd,
            year: yyyy
          },
        }],
      });

      return ResponseController.success(
        res,
        200,
        200,
        'Synod attendance retrieved successfully',
        payload
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
        userid, day, month, year, ...req.body
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
        userid, day, month, year, ...req.body
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
        userid, day, month, year, ...req.body
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
        userid, day, month, year, ...req.body
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
