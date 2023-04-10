import handlePermission from "@helpers/permission";
import ResponseController from "@helpers/response";
import apiLogFactory from "@factories/apilogs";
import { TrainingController } from "@controllers/reports";
import models from "@models";
import { userFindAll } from "../user.middleware";

const { Training, ApiLogs } = models;

const trainingFinder = async (req, res, next) => {
  const { id } = req.params;
  let training;
  try {
    training = await Training.findOne({ where: { id } });
    if (!training) throw new Error();
  } catch (err) {
    const apilog = apiLogFactory(TrainingController, req, err, "find", "training does not exist", 404, 404);

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(res, 404, 404, `${TrainingController.parameter} does not exist`, err);
  }

  req.training = training;
  next();
};

const trainingPermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, "training");
  } catch (err) {
    const apilog = apiLogFactory(TrainingController, req, err, "find", "You do not have enough permissions", 403, 403);

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

export { trainingFinder, trainingPermission };
