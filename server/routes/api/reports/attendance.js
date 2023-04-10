import express from "express";
import { AttendanceController as attendance } from "@controllers/reports";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { attendanceFinder, attendancePermission } from "@middlewares/reports";

const attendanceRouter = express.Router();

attendanceRouter.post("/", verifyToken, trim, attendancePermission, attendance.create);
attendanceRouter.get("/", verifyToken, attendance.getAll);
attendanceRouter.get("/:id", verifyToken, attendanceFinder, attendance.getById);
attendanceRouter.put("/:id", verifyToken, attendanceFinder, attendancePermission, attendance.update);
attendanceRouter.delete("/:id", verifyToken, attendanceFinder, attendancePermission, attendance.delete);

attendanceRouter.post("/global", verifyToken, trim, attendance.getGlobalAttendance);
attendanceRouter.post("/zones", verifyToken, trim, attendance.getZoneAttendance);
attendanceRouter.post("/branches", verifyToken, trim, attendance.getBranchAttendance);

export default attendanceRouter;
