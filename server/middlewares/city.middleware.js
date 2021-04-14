import { v4 } from "uuid";
import randString from "@helpers/utilities";
import ResponseController from "@helpers/response";
import models from "@models";

const { City, ApiLogs } = models;

const cityFinder = async (req, res, next) => {
  const { id } = req.params;
  let city;
  try {
    city = await City.findOne({ where: { id } });
    if (!city) throw new Error();
  } catch (err) {
    const apilog = {
      name: "cityFinder",
      refid: randString("CITY"),
      reqbody: JSON.stringify(req.body),
      resbody: JSON.stringify(err),
      httpstatuscode: 404,
      statuscode: 404,
      message: "City does not exist",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: Date.now(),
    };

    await ApiLogs.create({ ...apilog });
    ResponseController.error(res, 404, 404, "City does not exist", err);
  }

  req.city = city;
  next();
};

export default cityFinder;
