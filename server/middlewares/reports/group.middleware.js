import handlePermission from "@helpers/permission";
import ResponseController from "@helpers/response";
import apiLogFactory from "@factories/apilogs";
import { GroupController } from "@controllers/reports";
import models from "@models";
import { userFindAll } from "../user.middleware";

const { Group, ApiLogs } = models;

const groupFinder = async (req, res, next) => {
  const { id } = req.params;
  let group;
  try {
    group = await Group.findOne({ where: { id } });
    if (!group) throw new Error();
  } catch (err) {
    const apilog = apiLogFactory(GroupController, req, err, "find", "group does not exist", 404, 404);

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(res, 404, 404, `${GroupController.parameter} does not exist`, err);
  }

  req.group = group;
  next();
};

const groupPermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, "group");
  } catch (err) {
    const apilog = apiLogFactory(GroupController, req, err, "find", "You do not have enough permissions", 403, 403);

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

export { groupFinder, groupPermission };
