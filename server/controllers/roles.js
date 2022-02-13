import { v4 } from "uuid";
import randString from "@helpers/utilities";
import validationResponse from "@validations/validationResponse";
import validRole from "@validations/role";
import models from "@models";
import ResponseController from "@helpers/response";

const {
  Role, ApiLogs, PermissionRole, Permission
} = models;

/**
 * Role Controller
 * @async
 * @class RoleController
 */
class RoleController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof RoleController
   */
  static async create(req, res, next) {
    const apilog = {
      name: `${RoleController.parameters.toLowerCase()}.create`,
      refid: randString(`${RoleController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 201,
      statuscode: 201,
      message: `${RoleController.parameter} created successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = validRole(req.body);
      // Check Validation
      if (!isValid) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = "Error: invalid input";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        ResponseController.error(res, 400, 400, "Error: invalid input", errors);
      }

      const payload = await Role.create({ ...req.body });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        201,
        201,
        `${RoleController.parameter} created successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${RoleController.parameter} could not be created`;

      if (err.errors && err.errors[0].type === "unique violation") {
        apilog.message = JSON.stringify(validationResponse(err));
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        ResponseController.error(res, 400, 400, validationResponse(err), err);
      }

      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${RoleController.parameter} could not be created`,
        err
      );
    }
  }

  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof RoleController
   */
  static async assignpermissions(req, res, next) {
    const apilog = {
      name: `${RoleController.parameters.toLowerCase()}.assignpermissions`,
      refid: randString(`${RoleController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 201,
      statuscode: 201,
      message:
        "Permission(s) assigned successfully, Please logout and login again",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { role } = req;

      const payload = await role.addPermissions(req.body.permission);

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        201,
        201,
        "Permission(s) assigned successfully, Please logout and login again",
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Permission(s) could not be assigned";
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        "Permission(s) could not be assigned",
        err
      );
    }
  }

  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof RoleController
   */
  static async unassignpermissions(req, res, next) {
    const apilog = {
      name: `${RoleController.parameters.toLowerCase()}.unassignpermissions`,
      refid: randString(`${RoleController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message:
        "Permission(s) unassigned successfully, Please logout and login again",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { role } = req;

      const payload = await role.removePermissions(req.body.permission);

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        "Permission(s) unassigned successfully, Please logout and login again",
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Permission(s) could not be unassigned";
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        "Permission(s) could not be unassigned",
        err
      );
    }
  }

  // /**
  //  * @static
  //  * @param {*} req - Request object
  //  * @param {*} res - Response object
  //  * @param {*} next - The next middleware
  //  * @return {json} Returns json object
  //  * @memberof RoleController
  //  */
  // static async assignRoles(req, res, next) {
  //   const apilog = {
  //     name: `${RoleController.parameters.toLowerCase()}.assignRoles`,
  //     refid: randString(`${RoleController.parameter.toUpperCase()}`),
  //     reqbody: JSON.stringify(req.body),
  //     resbody: "",
  //     httpstatuscode: 201,
  //     statuscode: 201,
  //     message: "Role(s) assigned successfully, Please logout and login again",
  //     apiref: v4(),
  //     url: `${req.method} ~ ${req.originalUrl}`,
  //     reqstarttime: Date.now(),
  //     reqendtime: "",
  //   };

  //   try {
  //     const { role } = req;

  //     const payload = await role.addRoles(req.body.Role);

  //     apilog.resbody = JSON.stringify(payload);
  //     apilog.reqendtime = Date.now();
  //     await ApiLogs.create({ ...apilog });

  //     ResponseController.success(
  //       res,
  //       201,
  //       201,
  //       "Role(s) assigned successfully, Please logout and login again",
  //       payload
  //     );
  //   } catch (err) {
  //     apilog.resbody = JSON.stringify(err);
  //     apilog.httpstatuscode = 400;
  //     apilog.statuscode = 400;
  //     apilog.message = "Role(s) could not be assigned";
  //     apilog.reqendtime = Date.now();
  //     await ApiLogs.create({ ...apilog });

  //     ResponseController.error(
  //       res,
  //       400,
  //       400,
  //       "Role(s) could not be assigned",
  //       err
  //     );
  //   }
  // }

  // /**
  //  * @static
  //  * @param {*} req - Request object
  //  * @param {*} res - Response object
  //  * @param {*} next - The next middleware
  //  * @return {json} Returns json object
  //  * @memberof RoleController
  //  */
  // static async unassignRoles(req, res, next) {
  //   const apilog = {
  //     name: `${RoleController.parameters.toLowerCase()}.unassignRoles`,
  //     refid: randString(`${RoleController.parameter.toUpperCase()}`),
  //     reqbody: JSON.stringify(req.body),
  //     resbody: "",
  //     httpstatuscode: 200,
  //     statuscode: 200,
  //     message: "Role(s) unassigned successfully, Please logout and login again",
  //     apiref: v4(),
  //     url: `${req.method} ~ ${req.originalUrl}`,
  //     reqstarttime: Date.now(),
  //     reqendtime: "",
  //   };

  //   try {
  //     const { role } = req;

  //     const payload = await role.removeRoles(req.body.Role);

  //     apilog.resbody = JSON.stringify(payload);
  //     apilog.reqendtime = Date.now();
  //     await ApiLogs.create({ ...apilog });

  //     ResponseController.success(
  //       res,
  //       200,
  //       200,
  //       "Role(s) unassigned successfully, Please logout and login again",
  //       payload
  //     );
  //   } catch (err) {
  //     apilog.resbody = JSON.stringify(err);
  //     apilog.httpstatuscode = 400;
  //     apilog.statuscode = 400;
  //     apilog.message = `${RoleController.parameter} could not be retrieved`;
  //     apilog.reqendtime = Date.now();
  //     await ApiLogs.create({ ...apilog });

  //     ResponseController.error(
  //       res,
  //       400,
  //       400,
  //       "Role(s) could not be unassigned",
  //       err
  //     );
  //   }
  // }

  /**
   * Get all Roles
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof RoleController
   */
  static async getAll(req, res, next) {
    const apilog = {
      name: `${RoleController.parameters.toLowerCase()}.getAll`,
      refid: randString(`${RoleController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${RoleController.parameters} retrieved successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const payload = await Role.findAll({
        order: [["name", "ASC"]]
      });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${RoleController.parameters} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${RoleController.parameters} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${RoleController.parameters} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Get a role
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof RoleController
   */
  static async getById(req, res, next) {
    const { role } = req;

    const apilog = {
      name: `${RoleController.parameters.toLowerCase()}.getById`,
      refid: randString(`${RoleController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${RoleController.parameter} retrieved successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const payload = await Role.findOne({
        where: {
          id: role.id,
        },
        attributes: ["id", "name"],
        include: [
          {
            attributes: ["id", "name"],
            model: Permission,
            as: "permissions",
            through: {
              attributes: [],
              model: PermissionRole,
            },
          },
        ],
      });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${RoleController.parameter} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${RoleController.parameter} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${RoleController.parameter} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Update a Role
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof RoleController
   */
  static async update(req, res, next) {
    const apilog = {
      name: `${RoleController.parameters.toLowerCase()}.update`,
      refid: randString(`${RoleController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${RoleController.parameter} updated successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = validRole(req.body);
      // Check Validation
      if (!isValid) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = "Error: invalid input";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        ResponseController.error(res, 400, 400, "Error: invalid input", errors);
      }

      const { role } = req;
      const { id } = role;

      await Role.update(req.body, { returning: true, where: { id } });

      const payload = await Role.findAll({
        order: [["name", "ASC"]]
      });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${RoleController.parameter} updated successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${RoleController.parameter} could not be updated`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${RoleController.parameter} could not be updated`,
        err
      );
    }
  }

  /**
   * Delete a Role
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof RoleController
   */
  static async delete(req, res, next) {
    const apilog = {
      name: `${RoleController.parameters.toLowerCase()}.delete`,
      refid: randString(`${RoleController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${RoleController.parameter} deleted successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { role } = req;
      const { id } = role;
      await Role.destroy({ where: { id } });
      const payload = await Role.findAll({
        order: [["name", "ASC"]]
      });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${RoleController.parameter} deleted successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${RoleController.parameter} could not be deleted`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${RoleController.parameter} could not be deleted`,
        err
      );
    }
  }
}

RoleController.parameters = "Roles";
RoleController.parameter = "Role";

export default RoleController;
