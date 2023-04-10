import handlePermission from "@helpers/permission";
import ResponseController from "@helpers/response";
import apiLogFactory from "@factories/apilogs";
import { MembershipController } from "@controllers/reports";
import models from "@models";
import { userFindAll } from "../user.middleware";

const { Membership, ApiLogs } = models;

const membershipFinder = async (req, res, next) => {
  const { id } = req.params;
  let membership;
  try {
    membership = await Membership.findOne({ where: { id } });
    if (!membership) throw new Error();
  } catch (err) {
    const apilog = apiLogFactory(MembershipController, req, err, "find", "membership does not exist", 404, 404);

    await ApiLogs.create({ ...apilog });
    return ResponseController.error(res, 404, 404, `${MembershipController.parameter} does not exist`, err);
  }

  req.membership = membership;
  next();
};

const membershipPermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, "membership");
  } catch (err) {
    const apilog = apiLogFactory(MembershipController, req, err, "find", "You do not have enough permissions", 403, 403);

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

export { membershipFinder, membershipPermission };
