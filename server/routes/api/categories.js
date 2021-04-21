import express from "express";
import categories from "@controllers/categories";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { categoryFinder, categoryPermission } from "@middlewares/category.middleware";

const categoryRouter = express.Router();

categoryRouter.post("/", verifyToken, trim, categoryPermission, categories.create);
categoryRouter.get("/", verifyToken, categories.getAll);
categoryRouter.get("/:id", verifyToken, categoryFinder, categories.getById);
categoryRouter.put("/:id", verifyToken, categoryFinder, categoryPermission, categories.update);
categoryRouter.delete("/:id", verifyToken, categoryFinder, categoryPermission, categories.delete);

export default categoryRouter;
