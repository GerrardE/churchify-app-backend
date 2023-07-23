import { v4 } from "uuid";
import randString from "@helpers/utilities";
import ResponseController from "@helpers/response";
import models from "@models";
import handlePermission from "@helpers/permission";
import { userFindAll } from "./user.middleware";

const { City, ApiLogs } = models;

export const cityFinder = async (req, res, next) => {
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
    return ResponseController.error(res, 404, 404, "City does not exist", err);
  }

  req.city = city;
  next();
};

export const cityPermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, "city");
  } catch (err) {
    const apilog = {
      name: "cityPermission",
      refid: randString("CITY"),
      reqbody: JSON.stringify(req.body),
      resbody: JSON.stringify(err),
      httpstatuscode: 403,
      statuscode: 403,
      message: "You do not have enough permissions",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: Date.now(),
    };

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(
      res,
      403,
      403,
      "You do not have enough permissions",
      err
    );
  }

  next();
};
