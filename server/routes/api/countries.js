import express from "express";
import country from "@controllers/countries";
import trim from "@middlewares/trim";
import { verifyToken } from "@middlewares/Token";
import { countryFinder, countryPermission } from "@middlewares/country.middleware";

const countryRouter = express.Router();

countryRouter.post("/", verifyToken, trim, countryPermission, country.create);
countryRouter.get("/", country.getAll);
countryRouter.get("/:id", countryFinder, country.getById);
countryRouter.get("/:name/country", country.getByName);
countryRouter.put("/:id", verifyToken, countryFinder, countryPermission, country.update);
countryRouter.delete("/:id", verifyToken, countryFinder, countryPermission, country.delete);

export default countryRouter;
