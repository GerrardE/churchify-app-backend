import express from "express";
import { RemunerationController as remunerations } from "@controllers/finances";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { remunerationFinder, remunerationPermission } from "@middlewares/finances";

const remunerationRouter = express.Router();

remunerationRouter.post("/", verifyToken, trim, remunerationPermission, remunerations.create);
remunerationRouter.get("/", verifyToken, remunerations.getAll);
remunerationRouter.get("/:id", verifyToken, remunerationFinder, remunerations.getById);
remunerationRouter.put("/:id", verifyToken, remunerationFinder, remunerationPermission, remunerations.update);
remunerationRouter.delete("/:id", verifyToken, remunerationFinder, remunerationPermission, remunerations.delete);

export default remunerationRouter;
