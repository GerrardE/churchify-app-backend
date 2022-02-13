import { v4 } from "uuid";
import randString from "@helpers/utilities";
import handlePermission from "@helpers/permission";
import ResponseController from "@helpers/response";
import models from "@models";
import { userFindAll } from "./user.middleware";

const { TrainingType, ApiLogs } = models;

const trainingTypeFinder = async (req, res, next) => {
  const { id } = req.params;
  let trainingtype;
  try {
    trainingtype = await TrainingType.findOne({ where: { id } });
    if (!trainingtype) throw new Error();
  } catch (err) {
    const apilog = {
      name: "trainingTypeFinder",
      refid: randString("TRAININGTYPE"),
      reqbody: JSON.stringify(req.body),
      resbody: JSON.stringify(err),
      httpstatuscode: 404,
      statuscode: 404,
      message: "Trainingtype does not exist",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: Date.now(),
    };

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(res, 404, 404, "Trainingtype does not exist", err);
  }

  req.trainingtype = trainingtype;
  next();
};

const trainingTypePermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, "trainingtype");
  } catch (err) {
    const apilog = {
      name: "trainingtypePermission",
      refid: randString("TRAININGTYPE"),
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

export { trainingTypeFinder, trainingTypePermission };
