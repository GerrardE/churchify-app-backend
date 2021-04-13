import { v4 } from "uuid";
import randString from "@helpers/utilities";
import handlePermission from "@helpers/permission";
import ResponseController from "@helpers/response";
import models from "@models";
import { userFindAll } from "./user.middleware";

const { Zone, ApiLogs } = models;

const zoneFinder = async (req, res, next) => {
  const { id } = req.params;
  let zone;
  try {
    zone = await Zone.findOne({ where: { id } });
    if (!zone) throw new Error();
  } catch (err) {
    const apilog = {
      name: "zoneFinder",
      refid: randString("ZONE"),
      reqbody: JSON.stringify(req.body),
      resbody: JSON.stringify(err),
      httpstatuscode: 404,
      statuscode: 404,
      message: "Zone does not exist",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: Date.now(),
    };

    await ApiLogs.create({ ...apilog });
    ResponseController.error(res, 404, 404, "Zone does not exist", err);
  }

  req.zone = zone;
  next();
};

const zonePermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, "zone");
  } catch (err) {
    const apilog = {
      name: "zonePermission",
      refid: randString("ZONE"),
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

export { zoneFinder, zonePermission };
