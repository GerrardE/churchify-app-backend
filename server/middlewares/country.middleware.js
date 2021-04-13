import { v4 } from "uuid";
import randString from "@helpers/utilities";
import ResponseController from "@helpers/response";
import models from "@models";

const { Country, ApiLogs } = models;

const countryFinder = async (req, res, next) => {
  const { id } = req.params;
  let country;
  try {
    country = await Country.findOne({ where: { id } });
    if (!country) throw new Error();
  } catch (err) {
    const apilog = {
      name: "countryFinder",
      refid: randString("COUNTRY"),
      reqbody: JSON.stringify(req.body),
      resbody: JSON.stringify(err),
      httpstatuscode: 404,
      statuscode: 404,
      message: "Country does not exist",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: Date.now(),
    };

    await ApiLogs.create({ ...apilog });
    ResponseController.error(res, 404, 404, "Country does not exist", err);
  }

  req.country = country;
  next();
};

export default countryFinder;
