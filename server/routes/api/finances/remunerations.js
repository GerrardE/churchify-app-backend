import express from "express";
import { RemunerationController as remunerations } from "@controllers/finances";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { remunerationFinder, remunerationPermission } from "@middlewares/finances";

const multer = require("multer");

const upload = multer();

const remunerationRouter = express.Router();

remunerationRouter.post("/", verifyToken, trim, upload.single("upload"), remunerationPermission, remunerations.create);
remunerationRouter.get("/", verifyToken, remunerations.getAll);
remunerationRouter.get("/:id", verifyToken, remunerationFinder, remunerations.getById);
remunerationRouter.put("/:id", verifyToken, remunerationFinder, upload.single("upload"), remunerationPermission, remunerations.update);
remunerationRouter.delete("/:id", verifyToken, remunerationFinder, remunerationPermission, remunerations.delete);

export default remunerationRouter;
