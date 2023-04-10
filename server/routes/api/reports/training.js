import express from "express";
import { TrainingController as training } from "@controllers/reports";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { trainingFinder, trainingPermission } from "@middlewares/reports";

const trainingRouter = express.Router();

trainingRouter.post("/", verifyToken, trim, trainingPermission, training.create);
trainingRouter.get("/", verifyToken, training.getAll);
trainingRouter.get("/:id", verifyToken, trainingFinder, training.getById);
trainingRouter.put("/:id", verifyToken, trainingFinder, trainingPermission, training.update);
trainingRouter.delete("/:id", verifyToken, trainingFinder, trainingPermission, training.delete);

export default trainingRouter;
