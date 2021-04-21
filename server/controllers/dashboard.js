/* eslint-disable no-await-in-loop */
import { v4 } from "uuid";
import sequelize from "sequelize";
import ResponseController from "@helpers/response";
import models from "@models";
import randString from "@helpers/utilities";

const { ApiLogs } = models;

/**
 * Dashboard Controller
 * @async
 * @class DashboardController
 */
class DashboardController {
  /**
   * Get statistics
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof DashboardController
   */
  static async getStatistics(req, res) {
    const apilog = {
      name: `${DashboardController.parameters.toLowerCase()}.getStatistics`,
      refid: randString(`${DashboardController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 201,
      statuscode: 201,
      message: "Statistics retrieved successfully",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const payload = {
        weeklabels: [],
        weeklymembership: [],
        weeklyattendance: [],
      };

      // Total number of each report submitted today
      const todayDate = new Date();
      const start = new Date(new Date(todayDate) - 24 * 60 * 60 * 1000);
      const end = new Date(todayDate);

      payload.dailyattendance = await models.Attendance.count({
        where: {
          createdAt: {
            [sequelize.Op.between]: [start, end],
          },
        },
      });
      payload.dailyactivity = await models.Activity.count({
        where: {
          createdAt: {
            [sequelize.Op.between]: [start, end],
          },
        },
      });
      payload.dailymembership = await models.Membership.count({
        where: {
          createdAt: {
            [sequelize.Op.between]: [start, end],
          },
        },
      });
      payload.dailytraining = await models.Training.count({
        where: {
          createdAt: {
            [sequelize.Op.between]: [start, end],
          },
        },
      });
      payload.dailygroup = await models.Group.count({
        where: {
          createdAt: {
            [sequelize.Op.between]: [start, end],
          },
        },
      });
      payload.dailyfellowship = await models.Freport.count({
        where: {
          createdAt: {
            [sequelize.Op.between]: [start, end],
          },
        },
      });

      for (let i = 0; i < 7; i += 1) {
        const iDate = new Date();

        const tDate = iDate.setDate(iDate.getDate() - i);

        const begining = new Date(new Date(tDate) - 24 * 60 * 60 * 1000);

        let ending = new Date(tDate);

        const attendance = await models.Attendance.findAll({
          where: {
            createdAt: {
              [sequelize.Op.between]: [begining, ending],
            },
          },
          attributes: [
            [
              sequelize.literal(
                "COALESCE(children, 0) + COALESCE(women, 0) + COALESCE(men, 0)"
              ),
              "total",
            ],
          ],
        });

        const membership = await models.Membership.findAll({
          where: {
            createdAt: {
              [sequelize.Op.between]: [start, end],
            },
          },
          attributes: [
            [
              sequelize.literal("COALESCE(adults, 0) + COALESCE(children, 0)"),
              "total",
            ],
          ],
        });

        let mdata = 0;

        membership.map((member) => {
          mdata += member.dataValues.total;
          return mdata;
        });

        let adata = 0;

        attendance.map((attdr) => {
          adata += attdr.dataValues.total;
          return adata;
        });

        payload.weeklymembership.push(mdata);

        payload.weeklyattendance.push(adata);

        ending = ending.toJSON().slice(0, 10);
        payload.weeklabels.push(ending);
      }

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        "Statistics retrieved successfully",
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Statistics could not be retrieved";
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        "Statistics could not be retrieved",
        err
      );
    }
  }
}

DashboardController.parameter = "Dashboard";
DashboardController.parameters = "Dashboards";

export default DashboardController;
