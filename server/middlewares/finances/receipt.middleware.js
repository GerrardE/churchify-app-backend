import handlePermission from "@helpers/permission";
import ResponseController from "@helpers/response";
import apiLogFactory from "@factories/apilogs";
import { ReceiptController } from "@controllers/finances";
import models from "@models";
import { userFindAll } from "../user.middleware";

const { Receipt, ApiLogs } = models;

const receiptFinder = async (req, res, next) => {
  const { id } = req.params;
  let receipt;
  try {
    receipt = await Receipt.findOne({ where: { id } });
    if (!receipt) throw new Error();
  } catch (err) {
    const apilog = apiLogFactory(ReceiptController, req, err, "find", "receipt does not exist", 404, 404);

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(res, 404, 404, `${ReceiptController.parameter} does not exist`, err);
  }

  req.receipt = receipt;
  next();
};

const receiptPermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, "receipt");
  } catch (err) {
    const apilog = apiLogFactory(ReceiptController, req, err, "find", "You do not have enough permissions", 403, 403);

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

export { receiptFinder, receiptPermission };
