import handlePermission from "@helpers/permission";
import ResponseController from "@helpers/response";
import apiLogFactory from "@factories/apilogs";
import { AssetController } from "@controllers/finances";
import models from "@models";
import { userFindAll } from "../user.middleware";

const { Asset, ApiLogs } = models;

const assetFinder = async (req, res, next) => {
  const { id } = req.params;
  let asset;
  try {
    asset = await Asset.findOne({ where: { id } });
    if (!asset) throw new Error();
  } catch (err) {
    const apilog = apiLogFactory(AssetController, req, err, "find", "asset does not exist", 404, 404);

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(res, 404, 404, `${AssetController.parameter} does not exist`, err);
  }

  req.asset = asset;
  next();
};

const assetPermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, "asset");
  } catch (err) {
    const apilog = apiLogFactory(AssetController, req, err, "find", "You do not have enough permissions", 403, 403);

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

export { assetFinder, assetPermission };
