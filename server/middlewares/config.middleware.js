import { v4 } from "uuid";
import randString from "@helpers/utilities";
import ResponseController from "@helpers/response";
import models from "@models";

const { Config, ApiLogs } = models;

const configFinder = async (req, res, next) => {
  const { id } = req.params;
  let config;
  try {
    config = await Config.findOne({ where: { id } });
    if (!config) throw new Error();
  } catch (err) {
    const apilog = {
      name: "configFinder",
      refid: randString("CONFIG"),
      reqbody: JSON.stringify(req.body),
      resbody: JSON.stringify(err),
      httpstatuscode: 404,
      statuscode: 404,
      message: "Config does not exist",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: Date.now(),
    };

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(res, 404, 404, "Config does not exist", err);
  }

  req.config = config;
  next();
};

const confFinder = async (req, res, next) => {
  const { name } = req.params;
  let config;
  try {
    config = await Config.findOne({ where: { name } });
    if (!config) throw new Error();
  } catch (err) {
    const apilog = {
      name: "confFinder",
      refid: randString("CONFIG"),
      reqbody: JSON.stringify(req.body),
      resbody: JSON.stringify(err),
      httpstatuscode: 404,
      statuscode: 404,
      message: "Config does not exist",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: Date.now(),
    };

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(res, 404, 404, "Config does not exist", err);
  }

  req.config = config;
  next();
};

export { configFinder, confFinder };
