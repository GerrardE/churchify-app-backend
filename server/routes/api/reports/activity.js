import express from "express";
import { ActivityController as activity } from "@controllers/reports";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { activityFinder, activityPermission } from "@middlewares/reports";

const activityRouter = express.Router();

activityRouter.post("/", verifyToken, trim, activityPermission, activity.create);
activityRouter.get("/", verifyToken, activity.getAll);
activityRouter.get("/:id", verifyToken, activityFinder, activity.getById);
activityRouter.put("/:id", verifyToken, activityFinder, activityPermission, activity.update);
activityRouter.delete("/:id", verifyToken, activityFinder, activityPermission, activity.delete);

export default activityRouter;
