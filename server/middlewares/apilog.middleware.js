import { v4 } from "uuid";
import handlePermission from "@helpers/permission";
import ResponseController from "@helpers/response";
import randString from "@helpers/utilities";
import models from "@models";
import { userFindAll } from "./user.middleware";

const { ApiLogs } = models;

const apilogFinder = async (req, res, next) => {
  const { id } = req.params;
  let apilog;
  try {
    apilog = await ApiLogs.findOne({ where: { id } });
    if (!apilog) throw new Error();
  } catch (err) {
    const apilogg = {
      name: "apilogFinder",
      refid: randString("APILOG"),
      reqbody: JSON.stringify(req.body),
      resbody: JSON.stringify(err),
      httpstatuscode: 404,
      statuscode: 404,
      message: "ApiLog does not exist",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: Date.now(),
    };

    await ApiLogs.create({ ...apilogg });

    ResponseController.error(res, 404, 404, "ApiLog does not exist", err);
  }

  req.apilog = apilog;
  next();
};

const apilogPermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, "apilog");
  } catch (err) {
    const apilog = {
      name: "apilogPermission",
      refid: randString("APILOG"),
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

export { apilogFinder, apilogPermission };
