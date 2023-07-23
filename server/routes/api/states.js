import express from "express";
import states from "@controllers/states";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { stateFinder, statePermission } from "@middlewares/state.middleware";

const statesRouter = express.Router();

statesRouter.post("/", verifyToken, trim, statePermission, states.create);
statesRouter.get("/", states.getAll);
statesRouter.get("/:id", stateFinder, states.getById);
statesRouter.get("/:id/country", stateFinder, states.getByCountryId);
statesRouter.put("/:id", verifyToken, stateFinder, statePermission, states.update);
statesRouter.delete("/:id", verifyToken, stateFinder, statePermission, states.delete);

export default statesRouter;
