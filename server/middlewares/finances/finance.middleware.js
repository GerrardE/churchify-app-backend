import handlePermission from "@helpers/permission";
import ResponseController from "@helpers/response";
import apiLogFactory from "@factories/apilogs";
import { FinanceController } from "@controllers/finances";
import models from "@models";
import { userFindAll } from "../user.middleware";

const { Finance, ApiLogs } = models;

const financeFinder = async (req, res, next) => {
  const { id } = req.params;
  let finance;
  try {
    finance = await Finance.findOne({ where: { id } });
    if (!finance) throw new Error();
  } catch (err) {
    const apilog = apiLogFactory(FinanceController, req, err, "find", "finance does not exist", 404, 404);

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(res, 404, 404, `${FinanceController.parameter} does not exist`, err);
  }

  req.finance = finance;
  next();
};

const financePermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, "finance");
  } catch (err) {
    const apilog = apiLogFactory(FinanceController, req, err, "find", "You do not have enough permissions", 403, 403);

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

export { financeFinder, financePermission };
