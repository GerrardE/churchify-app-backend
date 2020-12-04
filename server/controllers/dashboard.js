import ResponseController from '@helpers/response';
import models from '@models';

/**
 * Dashboard Controller
 * @async
 * @class DashboardController
 */
class DashboardController {
  /**
   * Get daily statistics
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof DashboardController
   */
  static async getDailyReportSubmissionStatistics(req, res) {
    try {
      const payload = {};

      // Total number of each report submitted today
      const todayDate = new Date();

      payload.attendance = await models.Attendance.count({
        where: { createdAt: todayDate },
      });
      payload.activity = await models.Activity.count({
        where: { createdAt: todayDate },
      });
      payload.membership = await models.Membership.count({
        where: { createdAt: todayDate },
      });
      payload.training = await models.Training.count({
        where: { createdAt: todayDate },
      });
      payload.group = await models.Group.count({
        where: { createdAt: todayDate },
      });
      payload.fellowship = await models.Fellowship.count({
        where: { createdAt: todayDate },
      });

      return ResponseController.success(
        res,
        200,
        200,
        'Daily report submission statistics retrieved successfully',
        payload
      );
    } catch (err) {
      return ResponseController.error(
        res,
        400,
        400,
        'Daily report submission statistics could not be retrieved',
        err
      );
    }
  }

  /**
   * Get weekly membership statistics
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof DashboardController
   */
  static async getWeeklyMembershipStatistics(req, res) {
    try {
      const payload = [];

      for (let i = 0; i < 7; i += 1) {
        let today = new Date();
        today = today.setDate(today.getDate() - i);

        // eslint-disable-next-line no-await-in-loop
        const membership = await models.Membership.count({
          where: { createdAt: today },
        });

        payload.push(membership);
      }

      payload.join(',');

      return ResponseController.success(
        res,
        200,
        200,
        'Weekly membership statistics retrieved successfully',
        payload
      );
    } catch (err) {
      return ResponseController.error(
        res,
        400,
        400,
        'Weekly report submission statistics could not be retrieved',
        err
      );
    }
  }
}

export default DashboardController;
