import ResponseController from "@helpers/response";
import validAttendance from "@validations/attendance";
import apiLogFactory from "@factories/apilogs";
import models from "@models";

const {
  Attendance,
  ApiLogs,
  sequelize,
} = models;

const today = new Date();
const day = today.getDay();
const month = today.getMonth();
const year = today.getFullYear();

/**
 * Attendance Controller
 * @async
 * @class AttendanceController
 */
class AttendanceController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof AttendanceController
   */
  static async create(req, res, next) {
    const apilog = apiLogFactory(AttendanceController, req, res, "create", "created successfully", 201, 201);

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
        return ResponseController.error(res, 400, 400, "Error: invalid input", errors);
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

      return ResponseController.success(
        res,
        201,
        201,
        apilog.message,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${AttendanceController.parameter} report submission failed`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(
        res,
        400,
        400,
        apilog.message,
        apilog.resbody
      );
    }
  }

  /**
   * Get all Attendances
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof AttendanceController
   */
  static async getAll(req, res, next) {
    const apilog = apiLogFactory(AttendanceController, req, res, "getAll", "retrieved successfully", 200, 200);

    try {
      const payload = await Attendance.findAll({
        limit: 100,
        order: [["createdAt", "DESC"]],
        attributes: ["id", "date", "women", "men", "children", "createdAt", "updatedAt"],
        include: [
          {
            attributes: ["firstname"],
            model: models.User,
            as: "attendance",
          },
          {
            attributes: ["name"],
            model: models.Branch,
            as: "branchattendance",
          },
        ],
      });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        200,
        200,
        apilog.message,
        payload
      );
    } catch (err) {
      apilog.resbody = err.toString();
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${AttendanceController.parameters} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(
        res,
        400,
        400,
        apilog.message,
        err
      );
    }
  }

  /**
   * Get a Attendance
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof AttendanceController
   */
  static async getById(req, res, next) {
    const { attendance: payload } = req;

    const apilog = apiLogFactory(AttendanceController, req, res, "getById", "retrieved successfully", 200, 200);

    try {
      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        200,
        200,
        apilog.message,
        payload
      );
    } catch (err) {
      apilog.resbody = err.toString();
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${AttendanceController.parameter} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        400,
        400,
        apilog.message,
        err
      );
    }
  }

  /**
   * Update Attendance
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof AttendanceController
   */
  static async update(req, res, next) {
    const apilog = apiLogFactory(AttendanceController, req, res, "update", "updated successfully", 200, 200);

    try {
      const { errors, isValid } = validAttendance(req.body, true);
      // Check Validation
      if (!isValid) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = "Error: invalid input";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        return ResponseController.error(res, 400, 400, "Error: invalid input", errors);
      }

      const { attendance } = req;
      const { userid, id } = attendance;

      await Attendance.update(req.body, {
        returning: true,
        where: { id, userid },
      });

      const payload = await Attendance.findAll({
        limit: 100
      });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        200,
        200,
        apilog.message,
        payload
      );
    } catch (err) {
      apilog.resbody = err.toString();
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${AttendanceController.parameter} could not be updated`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(
        res,
        400,
        400,
        apilog.message,
        err
      );
    }
  }

  /**
   * Delete Attendance
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof AttendanceController
   */
  static async delete(req, res, next) {
    const apilog = apiLogFactory(AttendanceController, req, res, "delete", "deleted successfully", 200, 200);

    try {
      const { attendance } = req;
      const { id, userid } = attendance;
      await Attendance.destroy({ where: { id, userid } });
      const payload = await Attendance.findAll({
        limit: 100
      });

      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        200,
        200,
        apilog.message,
        payload
      );
    } catch (err) {
      apilog.resbody = err.toString();
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${AttendanceController.parameter} could not be deleted`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        400,
        400,
        apilog.message,
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
  static async getGlobalAttendance(req, res, next) {
    const { from, to, eventid = 1 } = req.body;
    const apilog = apiLogFactory(AttendanceController, req, res, "getGlobalAttendance", `(global) retrieved ${from}-${to} successfully`, 200, 200);

    const eventquery = `select id, name from "Events" where id=${Number(
      eventid
    )}`;

    const attendancequery = `select 
    eventid,
    avg_children, avg_men, avg_women, TO_CHAR(attmonth, 'Month') 
    as month, total from 
      (
        SELECT
        ROUND(AVG(a.children)) as avg_children, 
        ROUND(AVG(a.men)) as avg_men, 
        ROUND(AVG(a.women)) as avg_women, 
        ROUND(ROUND(AVG(a.children))+ROUND(AVG(a.men))+ROUND(AVG(a.women))) as total,
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

      return ResponseController.success(res, 200, 200, apilog.message, payload);
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Global attendance could not be retrieved";
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(
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
  static async getZoneAttendance(req, res, next) {
    const {
      from, to, eventid = 1, zoneid = 1
    } = req.body;

    const apilog = apiLogFactory(AttendanceController, req, res, "getZoneAttendance", `(zone) retrieved ${from}-${to} successfully`, 200, 200);

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
      ROUND(AVG(a.children)) as avg_children, 
      ROUND(AVG(a.men)) as avg_men, 
      ROUND(AVG(a.women)) as avg_women, 
      ROUND(ROUND(AVG(a.children))+ROUND(AVG(a.men))+ROUND(AVG(a.women))) as total,
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

      return ResponseController.success(res, 200, 200, apilog.message, payload);
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Zone attendance could not be retrieved";
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(
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
  static async getBranchAttendance(req, res, next) {
    const {
      from, to, eventid = 1, branchid = 1
    } = req.body;

    const apilog = apiLogFactory(AttendanceController, req, res, "getBranchAttendance", `(branch) retrieved ${from}-${to} successfully`, 200, 200);

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
      ROUND(AVG(a.children)) as avg_children, 
      ROUND(AVG(a.men)) as avg_men, 
      ROUND(AVG(a.women)) as avg_women, 
      ROUND(ROUND(AVG(a.children))+ROUND(AVG(a.men))+ROUND(AVG(a.women))) as total,
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

      return ResponseController.success(res, 200, 200, apilog.message, payload);
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Branch attendance could not be retrieved";
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(
        res,
        400,
        400,
        "Branch attendance could not be retrieved",
        apilog.resbody
      );
    }
  }
}

AttendanceController.parameter = "Attendance";
AttendanceController.parameters = "Attendances";

export default AttendanceController;
