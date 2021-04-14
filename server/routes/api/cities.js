import express from "express";
import cities from "@controllers/cities";
import cityFinder from "@middlewares/city.middleware";
import stateFinder from "@middlewares/state.middleware";

const cityRouter = express.Router();

cityRouter.get("/:id", cityFinder, cities.getById);
cityRouter.get("/:id/state", stateFinder, cities.getByStateId);

export default cityRouter;
