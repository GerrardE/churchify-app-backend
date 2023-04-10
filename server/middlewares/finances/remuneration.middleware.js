import handlePermission from "@helpers/permission";
import ResponseController from "@helpers/response";
import apiLogFactory from "@factories/apilogs";
import { RemunerationController } from "@controllers/finances";
import models from "@models";
import { userFindAll } from "../user.middleware";

const { Remuneration, ApiLogs } = models;

const remunerationFinder = async (req, res, next) => {
  const { id } = req.params;
  let remuneration;
  try {
    remuneration = await Remuneration.findOne({ where: { id } });
    if (!remuneration) throw new Error();
  } catch (err) {
    const apilog = apiLogFactory(RemunerationController, req, err, "find", "remuneration does not exist", 404, 404);

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(res, 404, 404, `${RemunerationController.parameter} does not exist`, err);
  }

  req.remuneration = remuneration;
  next();
};

const remunerationPermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, "remuneration");
  } catch (err) {
    const apilog = apiLogFactory(RemunerationController, req, err, "find", "You do not have enough permissions", 403, 403);

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

export { remunerationFinder, remunerationPermission };
