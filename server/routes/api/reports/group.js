import express from "express";
import { GroupController as group } from "@controllers/reports";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { groupFinder, groupPermission } from "@middlewares/reports";

const groupRouter = express.Router();

groupRouter.post("/", verifyToken, trim, groupPermission, group.create);
groupRouter.get("/", verifyToken, group.getAll);
groupRouter.get("/:id", verifyToken, groupFinder, group.getById);
groupRouter.put("/:id", verifyToken, groupFinder, groupPermission, group.update);
groupRouter.delete("/:id", verifyToken, groupFinder, groupPermission, group.delete);

export default groupRouter;
