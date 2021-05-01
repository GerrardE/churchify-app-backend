import express from "express";
import users from "@controllers/users";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { userFinder, userPermission } from "@middlewares/user.middleware";

const userRouter = express.Router();

userRouter.get("/", verifyToken, userPermission, users.getAllUsers);
userRouter.get("/:id", verifyToken, userFinder, userPermission, users.getUser);
userRouter.put("/:id", verifyToken, userFinder, userPermission, users.updateUser);
userRouter.post("/auth/signup", trim, users.signup);
userRouter.post("/auth/signin", trim, users.signin);
userRouter.post("/roles", verifyToken, userPermission, users.assignrole);
userRouter.delete("/roles", verifyToken, userPermission, users.unassignrole);

export default userRouter;
