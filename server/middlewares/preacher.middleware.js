import { v4 } from "uuid";
import randString from "@helpers/utilities";
import handlePermission from "@helpers/permission";
import ResponseController from "@helpers/response";
import models from "@models";
import { userFindAll } from "./user.middleware";

const { Preacher, ApiLogs } = models;

const preacherFinder = async (req, res, next) => {
  const { id } = req.params;
  let preacher;
  try {
    preacher = await Preacher.findOne({ where: { id } });
    if (!preacher) throw new Error();
  } catch (err) {
    const apilog = {
      name: "preacherFinder",
      refid: randString("PREACHER"),
      reqbody: JSON.stringify(req.body),
      resbody: JSON.stringify(err),
      httpstatuscode: 404,
      statuscode: 404,
      message: "Preacher does not exist",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: Date.now(),
    };

    await ApiLogs.create({ ...apilog });
    ResponseController.error(res, 404, 404, "Preacher does not exist", err);
  }

  req.preacher = preacher;
  next();
};

const preacherPermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, "preacher");
  } catch (err) {
    const apilog = {
      name: "preacherPermission",
      refid: randString("PREACHER"),
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

export { preacherFinder, preacherPermission };
