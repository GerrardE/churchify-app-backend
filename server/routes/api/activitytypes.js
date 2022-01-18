import express from "express";
import activitytypes from "@controllers/activitytypes";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { activityTypeFinder, activityTypePermission } from "@middlewares/activitytypes.middleware";

const activityTypesRouter = express.Router();

activityTypesRouter.post("/", verifyToken, trim, activityTypePermission, activitytypes.create);
activityTypesRouter.get("/", verifyToken, activitytypes.getAll);
activityTypesRouter.get("/:id", verifyToken, activityTypeFinder, activitytypes.getById);
activityTypesRouter.put("/:id", verifyToken, activityTypeFinder, activityTypePermission, activitytypes.update);
activityTypesRouter.delete("/:id", verifyToken, activityTypeFinder, activityTypePermission, activitytypes.delete);

export default activityTypesRouter;
