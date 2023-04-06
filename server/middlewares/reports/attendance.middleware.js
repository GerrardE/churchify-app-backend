import handlePermission from "@helpers/permission";
import ResponseController from "@helpers/response";
import apiLogFactory from "@factories/apilogs";
import { AttendanceController } from "@controllers/reports";
import models from "@models";
import { userFindAll } from "../user.middleware";

const { Attendance, ApiLogs } = models;

const attendanceFinder = async (req, res, next) => {
  const { id } = req.params;
  let attendance;
  try {
    attendance = await Attendance.findOne({ where: { id } });
    if (!attendance) throw new Error();
  } catch (err) {
    const apilog = apiLogFactory(AttendanceController, req, err, "find", "attendance does not exist", 404, 404);

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(res, 404, 404, `${AttendanceController.parameter} does not exist`, err);
  }

  req.attendance = attendance;
  next();
};

const attendancePermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, "attendance");
  } catch (err) {
    const apilog = apiLogFactory(AttendanceController, req, err, "find", "You do not have enough permissions", 403, 403);

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(
      res,
      403,
      403,
      "You do not have enough permissions",
      err
    );
  }

  next();
};

export { attendanceFinder, attendancePermission };
