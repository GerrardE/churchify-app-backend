import handlePermission from "@helpers/permission";
import ResponseController from "@helpers/response";
import apiLogFactory from "@factories/apilogs";
import { ActivityController } from "@controllers/reports";
import models from "@models";
import { userFindAll } from "../user.middleware";

const { Activity, ApiLogs } = models;

const activityFinder = async (req, res, next) => {
  const { id } = req.params;
  let activity;
  try {
    activity = await Activity.findOne({ where: { id } });
    if (!activity) throw new Error();
  } catch (err) {
    const apilog = apiLogFactory(ActivityController, req, err, "find", "activity does not exist", 404, 404);

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(res, 404, 404, `${ActivityController.parameter} does not exist`, err);
  }

  req.activity = activity;
  next();
};

const activityPermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, "activity");
  } catch (err) {
    const apilog = apiLogFactory(ActivityController, req, err, "find", "You do not have enough permissions", 403, 403);

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

export { activityFinder, activityPermission };
