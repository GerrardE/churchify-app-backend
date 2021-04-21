import { v4 } from "uuid";
import randString from "@helpers/utilities";
import handlePermission from "@helpers/permission";
import ResponseController from "@helpers/response";
import models from "@models";
import { userFindAll } from "./user.middleware";

const { Permission, ApiLogs } = models;

const permissionFinder = async (req, res, next) => {
  const { id } = req.params;
  let permission;
  try {
    permission = await Permission.findOne({ where: { id } });
    if (!permission) throw new Error();
  } catch (err) {
    const apilog = {
      name: "permissionFinder",
      refid: randString("PERMISSION"),
      reqbody: JSON.stringify(req.body),
      resbody: JSON.stringify(err),
      httpstatuscode: 404,
      statuscode: 404,
      message: "Permission does not exist",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: Date.now(),
    };

    await ApiLogs.create({ ...apilog });
    ResponseController.error(res, 404, 404, "Permission does not exist", err);
  }

  req.permission = permission;
  next();
};

const permissionPermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, "permission");
  } catch (err) {
    const apilog = {
      name: "permissionPermission",
      refid: randString("PERMISSION"),
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

export { permissionFinder, permissionPermission };
