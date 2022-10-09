import { v4 } from "uuid";
import handlePermission from "@helpers/permission";
import ResponseController from "@helpers/response";
import randString from "@helpers/utilities";
import models from "@models";
import { userFindAll } from "./user.middleware";

const { Branch, ApiLogs } = models;

const branchFinder = async (req, res, next) => {
  const { id } = req.params;
  let branch;
  try {
    branch = await Branch.findOne({ where: { id } });
    if (!branch) throw new Error();
  } catch (err) {
    const apilog = {
      name: "branchFinder",
      refid: randString("BRANCH"),
      reqbody: JSON.stringify(req.body),
      resbody: JSON.stringify(err),
      httpstatuscode: 404,
      statuscode: 404,
      message: "Branch does not exist",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: Date.now(),
    };

    await ApiLogs.create({ ...apilog });

    return ResponseController.error(res, 404, 404, "Branch does not exist", err);
  }

  req.branch = branch;
  next();
};

const branchPermission = async (req, res, next) => {
  try {
    const { email } = req.decoded;

    const { permissions } = await userFindAll(email);

    await handlePermission(req, permissions, "branch");
  } catch (err) {
    const apilog = {
      name: "branchPermission",
      refid: randString("BRANCH"),
      reqbody: JSON.stringify(req.body),
      resbody: JSON.stringify(err),
      httpstatuscode: 403,
      statuscode: 403,
      message: "You do not have enough permissions",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: Date.now(),
    };

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

export { branchFinder, branchPermission };
