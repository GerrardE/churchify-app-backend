import express from "express";
import { ReceiptController as receipts } from "@controllers/finances";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { receiptFinder, receiptPermission } from "@middlewares/finances";

const multer = require("multer");

const upload = multer();

const receiptRouter = express.Router();

receiptRouter.post("/", verifyToken, trim, upload.single("upload"), receiptPermission, receipts.create);
receiptRouter.get("/", verifyToken, receipts.getAll);
receiptRouter.get("/:id", verifyToken, receiptFinder, receipts.getById);
receiptRouter.put("/:id", verifyToken, receiptFinder, upload.single("upload"), receiptPermission, receipts.update);
receiptRouter.delete("/:id", verifyToken, receiptFinder, receiptPermission, receipts.delete);

export default receiptRouter;
