import express from "express";
import states from "@controllers/states";
import stateFinder from "@middlewares/state.middleware";

const statesRouter = express.Router();

statesRouter.get("/:id", stateFinder, states.getById);
statesRouter.get("/:id/country", stateFinder, states.getByCountryId);

export default statesRouter;
