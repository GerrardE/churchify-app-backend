import express from "express";
import downloads from "@controllers/downloads";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { downloadFinder, downloadPermission } from "@middlewares/download.middleware";

const downloadRouter = express.Router();

downloadRouter.post("/", verifyToken, trim, downloadPermission, downloads.create);
downloadRouter.get("/", verifyToken, downloads.getAll);
downloadRouter.get("/:id", verifyToken, downloadFinder, downloads.getById);
downloadRouter.put("/:id", verifyToken, downloadFinder, downloadPermission, downloads.update);
downloadRouter.delete("/:id", verifyToken, downloadFinder, downloadPermission, downloads.delete);

export default downloadRouter;
