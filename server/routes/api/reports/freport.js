import express from "express";
import { FreportController as freport } from "@controllers/reports";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { freportFinder, freportPermission } from "@middlewares/reports";

const freportRouter = express.Router();

freportRouter.post("/", verifyToken, trim, freportPermission, freport.create);
freportRouter.get("/", verifyToken, freport.getAll);
freportRouter.get("/:id", verifyToken, freportFinder, freport.getById);
freportRouter.put("/:id", verifyToken, freportFinder, freportPermission, freport.update);
freportRouter.delete("/:id", verifyToken, freportFinder, freportPermission, freport.delete);

export default freportRouter;
