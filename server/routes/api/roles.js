import express from "express";
import roles from "@controllers/roles";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { roleFinder } from "@middlewares/role.middleware";

const roleRouter = express.Router();

roleRouter.post("/", verifyToken, trim, roles.create);
roleRouter.post("/permissions/:id", verifyToken, roleFinder, roles.assignpermissions);
roleRouter.post("/permissions/:id/delete", verifyToken, roleFinder, roles.unassignpermissions);
roleRouter.get("/", verifyToken, roles.getAll);
roleRouter.get("/:id", verifyToken, roleFinder, roles.getById);
roleRouter.put("/:id", verifyToken, roleFinder, roles.update);
roleRouter.delete("/:id", verifyToken, roleFinder, roles.delete);

export default roleRouter;
