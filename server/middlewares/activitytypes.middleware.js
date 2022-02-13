import { v4 } from "uuid";
import randString from "@helpers/utilities";
import handlePermission from "@helpers/permission";
import ResponseController from "@helpers/response";
import models from "@models";
import { userFindAll } from "./user.middleware";

const { ActivityType, ApiLogs } = models;

const activityTypeFinder = async (req, res, next) => {
  const { id } = req.params;
  let activitytype;
  try {
    activitytype = await ActivityType.findOne({ where: { id } });
    if (!activitytype) throw new Error();
  } catch (err) {
    const apilog = {
      name: "activityTypeFinder",
      refid: randString("ACTIVITYTYPE"),
      reqbody: JSON.stringify(req.body),
      resbody: JSON.stringify(err),
      httpstatuscode: 404,
      statuscode: 404,
      message: "Activitytype does not exist",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: Date.now(),
    };

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(res, 404, 404, "Activitytype does not exist", err);
  }

  req.activitytype = activitytype;
  next();
};

const activityTypePermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, "activitytype");
  } catch (err) {
    const apilog = {
      name: "activitytypePermission",
      refid: randString("ACTIVITYTYPE"),
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

export { activityTypeFinder, activityTypePermission };
