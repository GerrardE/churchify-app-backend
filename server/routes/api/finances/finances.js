import express from "express";
import { FinanceController as finances } from "@controllers/finances";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { financeFinder, financePermission } from "@middlewares/finances";

const financeRouter = express.Router();

financeRouter.post("/", verifyToken, trim, financePermission, finances.create);
financeRouter.get("/", verifyToken, finances.getAll);
financeRouter.get("/:id", verifyToken, financeFinder, finances.getById);
financeRouter.put("/:id", verifyToken, financeFinder, financePermission, finances.update);
financeRouter.delete("/:id", verifyToken, financeFinder, financePermission, finances.delete);

export default financeRouter;
