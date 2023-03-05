import handlePermission from "@helpers/permission";
import ResponseController from "@helpers/response";
import apiLogFactory from "@factories/apilogs";
import { PaymentController } from "@controllers/finances";
import models from "@models";
import { userFindAll } from "../user.middleware";

const { Payment, ApiLogs } = models;

const paymentFinder = async (req, res, next) => {
  const { id } = req.params;
  let payment;
  try {
    payment = await Payment.findOne({ where: { id } });
    if (!payment) throw new Error();
  } catch (err) {
    const apilog = apiLogFactory(PaymentController, req, err, "find", "payment does not exist", 404, 404);

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(res, 404, 404, `${PaymentController.parameter} does not exist`, err);
  }

  req.payment = payment;
  next();
};

const paymentPermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, "payment");
  } catch (err) {
    const apilog = apiLogFactory(PaymentController, req, err, "find", "You do not have enough permissions", 403, 403);

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

export { paymentFinder, paymentPermission };
