import express from "express";
import trainingtypes from "@controllers/trainingtypes";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { trainingTypeFinder, trainingTypePermission } from "@middlewares/trainingtypes.middleware";

const trainingTypesRouter = express.Router();

trainingTypesRouter.post("/", verifyToken, trim, trainingTypePermission, trainingtypes.create);
trainingTypesRouter.get("/", verifyToken, trainingtypes.getAll);
trainingTypesRouter.get("/:id", verifyToken, trainingTypeFinder, trainingtypes.getById);
trainingTypesRouter.put("/:id", verifyToken, trainingTypeFinder, trainingTypePermission, trainingtypes.update);
trainingTypesRouter.delete("/:id", verifyToken, trainingTypeFinder, trainingTypePermission, trainingtypes.delete);

export default trainingTypesRouter;
