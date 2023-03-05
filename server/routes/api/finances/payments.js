import express from "express";
import { PaymentController as payments } from "@controllers/finances";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { paymentFinder, paymentPermission } from "@middlewares/finances";

const paymentRouter = express.Router();

paymentRouter.post("/", verifyToken, trim, paymentPermission, payments.create);
paymentRouter.get("/", verifyToken, payments.getAll);
paymentRouter.get("/:id", verifyToken, paymentFinder, payments.getById);
paymentRouter.put("/:id", verifyToken, paymentFinder, paymentPermission, payments.update);
paymentRouter.delete("/:id", verifyToken, paymentFinder, paymentPermission, payments.delete);

export default paymentRouter;
