import express from "express";
import reports from "@controllers/reports";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";

const reportRouter = express.Router();

reportRouter.post("/membership", verifyToken, trim, reports.membership);
reportRouter.post("/attendance", verifyToken, trim, reports.attendance);
reportRouter.post("/training", verifyToken, trim, reports.training);
reportRouter.post("/activity", verifyToken, trim, reports.activity);
reportRouter.post("/group", verifyToken, trim, reports.group);
reportRouter.post("/freport", verifyToken, trim, reports.freport);

// GENERATE ATTENDANCE
reportRouter.post("/synodattendance", verifyToken, trim, reports.getSynodAttendance);
reportRouter.post("/attendances/zones", verifyToken, trim, reports.getZoneAttendance);
reportRouter.post("/attendances/branches", verifyToken, trim, reports.getBranchAttendance);

export default reportRouter;
