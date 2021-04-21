import express from "express";
import apilogs from "@controllers/apilogs";
import { verifyToken } from "@middlewares/Token";
import { apilogFinder, apilogPermission } from "@middlewares/apilog.middleware";

const apilogRouter = express.Router();

apilogRouter.get("/", verifyToken, apilogPermission, apilogs.getAll);
apilogRouter.get("/:id", verifyToken, apilogFinder, apilogPermission, apilogs.getById);
apilogRouter.delete("/:id", verifyToken, apilogFinder, apilogPermission, apilogs.delete);

export default apilogRouter;
