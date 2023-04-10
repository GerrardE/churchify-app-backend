import express from "express";
import { ReceiptController as receipts } from "@controllers/finances";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { receiptFinder, receiptPermission } from "@middlewares/finances";

const receiptRouter = express.Router();

receiptRouter.post("/", verifyToken, trim, receiptPermission, receipts.create);
receiptRouter.get("/", verifyToken, receipts.getAll);
receiptRouter.get("/:id", verifyToken, receiptFinder, receipts.getById);
receiptRouter.put("/:id", verifyToken, receiptFinder, receiptPermission, receipts.update);
receiptRouter.delete("/:id", verifyToken, receiptFinder, receiptPermission, receipts.delete);

export default receiptRouter;
