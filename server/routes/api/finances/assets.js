import express from "express";
import { AssetController as assets } from "@controllers/finances";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { assetFinder, assetPermission } from "@middlewares/finances";

const assetRouter = express.Router();

assetRouter.post("/", verifyToken, trim, assetPermission, assets.create);
assetRouter.get("/", verifyToken, assets.getAll);
assetRouter.get("/:id", verifyToken, assetFinder, assets.getById);
assetRouter.put("/:id", verifyToken, assetFinder, assetPermission, assets.update);
assetRouter.delete("/:id", verifyToken, assetFinder, assetPermission, assets.delete);

export default assetRouter;
