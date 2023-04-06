import express from "express";
import { MembershipController as membership } from "@controllers/reports";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { membershipFinder, membershipPermission } from "@middlewares/reports";

const membershipRouter = express.Router();

membershipRouter.post("/", verifyToken, trim, membershipPermission, membership.create);
membershipRouter.get("/", verifyToken, membership.getAll);
membershipRouter.get("/:id", verifyToken, membershipFinder, membership.getById);
membershipRouter.put("/:id", verifyToken, membershipFinder, membershipPermission, membership.update);
membershipRouter.delete("/:id", verifyToken, membershipFinder, membershipPermission, membership.delete);

export default membershipRouter;
