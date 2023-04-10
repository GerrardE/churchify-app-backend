import handlePermission from "@helpers/permission";
import ResponseController from "@helpers/response";
import apiLogFactory from "@factories/apilogs";
import { FreportController } from "@controllers/reports";
import models from "@models";
import { userFindAll } from "../user.middleware";

const { Freport, ApiLogs } = models;

const freportFinder = async (req, res, next) => {
  const { id } = req.params;
  let freport;
  try {
    freport = await Freport.findOne({ where: { id } });
    if (!freport) throw new Error();
  } catch (err) {
    const apilog = apiLogFactory(FreportController, req, err, "find", "freport does not exist", 404, 404);

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(res, 404, 404, `${FreportController.parameter} does not exist`, err);
  }

  req.freport = freport;
  next();
};

const freportPermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, "freport");
  } catch (err) {
    const apilog = apiLogFactory(FreportController, req, err, "find", "You do not have enough permissions", 403, 403);

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

export { freportFinder, freportPermission };
