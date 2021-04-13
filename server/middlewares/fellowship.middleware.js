import { v4 } from "uuid";
import randString from "@helpers/utilities";
import handlePermission from "@helpers/permission";
import ResponseController from "@helpers/response";
import models from "@models";
import { userFindAll } from "./user.middleware";

const { Fellowship, ApiLogs } = models;

const fellowshipFinder = async (req, res, next) => {
  const { id } = req.params;
  let fellowship;
  try {
    fellowship = await Fellowship.findOne({ where: { id } });
    if (!fellowship) throw new Error();
  } catch (err) {
    const apilog = {
      name: "fellowshipFinder",
      refid: randString("FELLOWSHIP"),
      reqbody: JSON.stringify(req.body),
      resbody: JSON.stringify(err),
      httpstatuscode: 404,
      statuscode: 404,
      message: "Fellowship does not exist",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: Date.now(),
    };

    await ApiLogs.create({ ...apilog });
    ResponseController.error(res, 404, 404, "Fellowship does not exist", err);
  }

  req.fellowship = fellowship;
  next();
};

const fellowshipPermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, "fellowship");
  } catch (err) {
    const apilog = {
      name: "fellowshipPermission",
      refid: randString("FELLOWSHIP"),
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
    ResponseController.error(
      res,
      403,
      403,
      "You do not have enough permissions",
      err
    );
  }

  next();
};

export { fellowshipFinder, fellowshipPermission };
