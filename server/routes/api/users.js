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
userRouter.put("/role/reassign", verifyToken, userPermission, users.reassignrole);
userRouter.post("/forgot-password", trim, users.forgotPassword);
userRouter.put("/reset-password/:id", trim, users.resetPassword);

export default userRouter;
