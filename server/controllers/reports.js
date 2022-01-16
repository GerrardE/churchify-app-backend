import { v4 } from "uuid";
import randString from "@helpers/utilities";
import validMembership from "@validations/membership";
import validAttendance from "@validations/attendance";
import validTraining from "@validations/training";
import validActivity from "@validations/activity";
import validGroup from "@validations/group";
import validFreport from "@validations/freport";
import ResponseController from "@helpers/response";
import models from "@models";

const {
  Membership,
  Attendance,
  Training,
  Activity,
  Group,
  Freport,
  ApiLogs,
  sequelize,
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
      resbody: "",
      httpstatuscode: 201,
      statuscode: 201,
      message: "Membership report submitted successfully",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = await validMembership(req.body);
      // Check Validation
      if (!isValid) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = "Error: invalid input";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        ResponseController.error(res, 400, 400, "Error: invalid input", errors);
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
        "Membership report submitted successfully",
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Membership report submission failed";
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        "Membership report submission failed",
        apilog.resbody
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
      resbody: "",
      httpstatuscode: 201,
      statuscode: 201,
      message: "Attendance submitted successfully",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = await validAttendance(req.body);
      // Check Validation
      if (!isValid) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = "Error: invalid input";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        ResponseController.error(res, 400, 400, "Error: invalid input", errors);
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
        "Attendance submitted successfully",
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Attendance submission failed";
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        "Attendance submission failed",
        apilog.resbody
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
  static async getGlobalAttendance(req, res) {
    const { from, to, eventid = 1 } = req.body;

    const apilog = {
      name: `${ReportController.parameters.toLowerCase()}.getGlobalAttendance`,
      refid: randString(`${ReportController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `Global attendance retrieved ${from}-${to} successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    const eventquery = `select id, name from "Events" where id=${Number(
      eventid
    )}`;

    const attendancequery = `select 
    eventid,
    avg_children, avg_men, avg_women, TO_CHAR(attmonth, 'Month') 
    as month, total from 
      (
        SELECT
        ROUND(AVG(a.children), 2) as avg_children, 
        ROUND(AVG(a.men), 2) as avg_men, 
        ROUND(AVG(a.women), 2) as avg_women, 
        ROUND(ROUND(AVG(a.children), 2)+ROUND(AVG(a.men), 2)+ROUND(AVG(a.women), 2)) as total,
        a.eventid,
        DATE_TRUNC('month', a.date) as attmonth
        from "Attendances" a
        LEFT JOIN "Events" on "Events".id=a.eventid, "Events" e
        GROUP BY 
        a.eventid, attmonth
        ORDER BY attmonth ASC
      ) as x
  WHERE x.attmonth >= '${from}' AND x.attmonth <= '${to}'
  AND eventid=${Number(eventid)}`;

    try {
      const event = await sequelize.query(eventquery);
      const attendance = await sequelize.query(attendancequery);
      const payload = {
        range: `${from} to ${to}`,
        event: event[0][0],
        attendance: attendance[0],
      };

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(res, 200, 200, apilog.message, payload);
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Global attendance could not be retrieved";
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        "Global attendance could not be retrieved",
        apilog.resbody
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
    const { from, to, eventid = 1, zoneid = 1 } = req.body;

    const apilog = {
      name: `${ReportController.parameters.toLowerCase()}.getZoneAttendance`,
      refid: randString(`${ReportController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `Zone attendance retrieved ${from}-${to} successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    const eventquery = `select id, name from "Events" where id=${Number(
      eventid
    )}`;

    const zonequery = `select id, name from "Zones" where id=${Number(zoneid)}`;

    const attendancequery = `select 
  eventid,
  zoneid,
  avg_children, avg_men, avg_women, TO_CHAR(attmonth, 'Month') 
  as month, total from 
    (
      SELECT
      ROUND(AVG(a.children), 2) as avg_children, 
      ROUND(AVG(a.men), 2) as avg_men, 
      ROUND(AVG(a.women), 2) as avg_women, 
      ROUND(ROUND(AVG(a.children), 2)+ROUND(AVG(a.men), 2)+ROUND(AVG(a.women), 2)) as total,
      a.eventid, a.zoneid as zoneid,
      DATE_TRUNC('month', a.date) as attmonth
      from "Attendances" a
      LEFT JOIN "Events" on "Events".id=a.eventid, "Events" e
      GROUP BY 
      a.eventid, attmonth, a.zoneid 
      ORDER BY attmonth ASC
    ) as x 
  WHERE x.attmonth >= '${from}' AND x.attmonth <= '${to}'
  AND eventid=${Number(eventid)} AND zoneid=${Number(zoneid)}`;

    try {
      const event = await sequelize.query(eventquery);
      const zone = await sequelize.query(zonequery);
      const attendance = await sequelize.query(attendancequery);
      const payload = {
        range: `${from} to ${to}`,
        event: event[0][0],
        zone: zone[0][0],
        attendance: attendance[0],
      };

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(res, 200, 200, apilog.message, payload);
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Zone attendance could not be retrieved";
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        "Zone attendance could not be retrieved",
        apilog.resbody
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
    const { from, to, eventid = 1, branchid = 1 } = req.body;

    const apilog = {
      name: `${ReportController.parameters.toLowerCase()}.getBranchAttendance`,
      refid: randString(`${ReportController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `Branch attendance retrieved ${from}-${to} successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    const eventquery = `select id, name from "Events" where id=${Number(
      eventid
    )}`;

    const branchquery = `select id, name from "Branches" where id=${Number(
      branchid
    )}`;

    const attendancequery = `select 
  eventid,
  branchid,
  avg_children, avg_men, avg_women, TO_CHAR(attmonth, 'Month') 
  as month, total from 
    (
      SELECT
      ROUND(AVG(a.children), 2) as avg_children, 
      ROUND(AVG(a.men), 2) as avg_men, 
      ROUND(AVG(a.women), 2) as avg_women, 
      ROUND(ROUND(AVG(a.children), 2)+ROUND(AVG(a.men), 2)+ROUND(AVG(a.women), 2)) as total,
      a.eventid, a.branchid as branchid,
      DATE_TRUNC('month', a.date) as attmonth
      from "Attendances" a
      LEFT JOIN "Events" on "Events".id=a.eventid, "Events" e
      GROUP BY 
      a.eventid, attmonth, a.branchid 
      ORDER BY attmonth ASC
    ) as x 
  WHERE x.attmonth >= '${from}' AND x.attmonth <= '${to}'
  AND eventid=${Number(eventid)} AND branchid=${Number(branchid)}
  `;

    try {
      const event = await sequelize.query(eventquery);
      const branch = await sequelize.query(branchquery);
      const attendance = await sequelize.query(attendancequery);
      const payload = {
        range: `${from} to ${to}`,
        event: event[0][0],
        branch: branch[0][0],
        attendance: attendance[0],
      };
      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(res, 200, 200, apilog.message, payload);
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Branch attendance could not be retrieved";
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        "Branch attendance could not be retrieved",
        apilog.resbody
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
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: "Synod attendance retrieved successfully",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { years, dd } = req.body;

      const payload = Object.values(years).map((v) => {
        const d = models.Zone.findAll({
          attributes: ["id", "name"],
          include: [
            {
              model: models.Attendance,
              as: "zoneattendance",
              attributes: [
                [
                  sequelize.literal(
                    "COALESCE(men, 0) + COALESCE(women, 0) + COALESCE(children, 0)"
                  ),
                  "total",
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
        "Synod attendance retrieved successfully",
        payload[1]
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Synod attendance could not be retrieved";
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        "Synod attendance could not be retrieved",
        apilog.resbody
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

      const reducer = (accumulator, currentvalue) =>
        accumulator + currentvalue.dataValues.total;

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

      const reducer = (accumulator, currentvalue) =>
        accumulator + currentvalue.dataValues.total;

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

      const reducer = (accumulator, currentvalue) =>
        accumulator + currentvalue.dataValues.total;

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
      resbody: "",
      httpstatuscode: 201,
      statuscode: 201,
      message: "Training report submitted successfully",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = await validTraining(req.body);
      // Check Validation
      if (!isValid) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = "Error: invalid input";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        ResponseController.error(res, 400, 400, "Error: invalid input", errors);
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
        "Training report submitted successfully",
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Training report submission failed";
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        "Training report submission failed",
        apilog.resbody
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
      resbody: "",
      httpstatuscode: 201,
      statuscode: 201,
      message: "Activity report submitted successfully",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = await validActivity(req.body);
      // Check Validation
      if (!isValid) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = "Error: invalid input";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        ResponseController.error(res, 400, 400, "Error: invalid input", errors);
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
        "Activity report submitted successfully",
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Activity report submission failed";
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        "Activity report submission failed",
        apilog.resbody
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
      resbody: "",
      httpstatuscode: 201,
      statuscode: 201,
      message: "Group report submitted successfully",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = await validGroup(req.body);
      // Check Validation
      if (!isValid) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = "Error: invalid input";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        ResponseController.error(res, 400, 400, "Error: invalid input", errors);
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
        "Group report submitted successfully",
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Group report submission failed";
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        "Group report submission failed",
        apilog.resbody
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
      resbody: "",
      httpstatuscode: 201,
      statuscode: 201,
      message: "Fellowship report submitted successfully",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = await validFreport(req.body);
      // Check Validation
      if (!isValid) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = "Error: invalid input";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        ResponseController.error(res, 400, 400, "Error: invalid input", errors);
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
        "Fellowship report submitted successfully",
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Fellowship report submission failed";
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        "Fellowship report submission failed",
        apilog.resbody
      );
    }
  }
}

ReportController.parameter = "Report";
ReportController.parameters = "Reports";

export default ReportController;
