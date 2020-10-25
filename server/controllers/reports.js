import validMembership from '@validations/membership';
import validAttendance from '@validations/attendance';
import validTraining from '@validations/training';
import validActivity from '@validations/activity';
import validGroup from '@validations/group';
import validFreport from '@validations/freport';
import models from '@models';

const {
  Membership, Attendance, Training, Activity, Group, Freport
} = models;

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
          errors
        });
      }

      const { id: userid } = req.decoded;

      const payload = await Membership.create({ userid, ...req.body });

      res.status(200).json({
        status: 200, message: 'Membership report submitted successfully', payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Membership report submission failed'
      });
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
          errors
        });
      }

      const { id: userid } = req.decoded;

      const payload = await Attendance.create({ userid, ...req.body });

      res.status(200).json({
        status: 200, message: 'Attendance submitted successfully', payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Attendance submission failed'
      });
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
          errors
        });
      }

      const { id: userid } = req.decoded;

      const payload = await Training.create({ userid, ...req.body });

      res.status(200).json({
        status: 200, message: 'Training report submitted successfully', payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Training report submission failed'
      });
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
          errors
        });
      }

      const { id: userid } = req.decoded;

      const payload = await Activity.create({ userid, ...req.body });

      res.status(200).json({
        status: 200, message: 'Activity report submitted successfully', payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Activity report submission failed'
      });
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
          errors
        });
      }

      const { id: userid } = req.decoded;

      const payload = await Group.create({ userid, ...req.body });

      res.status(200).json({
        status: 200, message: 'Group report submitted successfully', payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Group report submission failed'
      });
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
          errors
        });
      }

      const { id: userid } = req.decoded;

      const payload = await Freport.create({ userid, ...req.body });

      res.status(200).json({
        status: 200, message: 'Fellowship report submitted successfully', payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Fellowship report submission failed'
      });
    }
  }
}

export default ReportController;
