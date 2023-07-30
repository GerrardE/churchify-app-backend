import express from "express";
import cities from "@controllers/cities";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { cityFinder, cityPermission } from "@middlewares/city.middleware";
import { stateFinder } from "@middlewares/state.middleware";

const cityRouter = express.Router();

cityRouter.post("/", verifyToken, trim, cityPermission, cities.create);
cityRouter.get("/", cities.getAll);
cityRouter.get("/:id", cityFinder, cities.getById);
cityRouter.get("/:id/state", stateFinder, cities.getByStateId);
cityRouter.put("/:id", verifyToken, cityFinder, cityPermission, cities.update);
cityRouter.delete("/:id", verifyToken, cityFinder, cityPermission, cities.delete);

export default cityRouter;
