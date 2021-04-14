import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import randString from "@helpers/utilities";
import userExtractor from "@helpers/userExtractor";
import { createToken } from "@middlewares/Token";
import { validSignup, validUpdate } from "@validations/signup";
import validSignin from "@validations/signin";
import validationResponse from "@validations/validationResponse";
import ResponseController from "@helpers/response";
import models from "@models";

const {
  User, Role, Permission, ApiLogs
} = models;

/**
 * User Controller
 * @async
 * @class UserController
 */
class UserController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof UserController
   */
  static async signup(req, res) {
    const apilog = {
      name: `${UserController.parameters.toLowerCase()}.signup`,
      refid: randString(`${UserController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 201,
      statuscode: 201,
      message: "Registration successful",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = validSignup(req.body);
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

      const user = await User.create(req.body);

      const payload = {
        id: user.id,
        email: user.email,
      };

      const token = await createToken(payload);

      apilog.resbody = JSON.stringify(userExtractor(user, token));
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        201,
        201,
        "Registration successful",
        userExtractor(user, token)
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Registration unsuccessful";

      if (err.errors && err.errors[0].type === "unique violation") {
        apilog.message = JSON.stringify(validationResponse(err));
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        ResponseController.error(res, 400, 400, validationResponse(err), err);
      }

      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(res, 400, 400, "Registration unsuccessful", err);
    }
  }

  /**
   * User Signin
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof UserController
   */
  static async signin(req, res) {
    const apilog = {
      name: `${UserController.parameters.toLowerCase()}.signin`,
      refid: randString(`${UserController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: "Login successful",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = validSignin(req.body);
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

      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
        include: [
          {
            attributes: ["id", "name"],
            model: Role,
            as: "roles",
            include: {
              model: Permission,
              as: "permissions",
            },
          },
        ],
      });

      if (!user) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = "Invalid email or password";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        ResponseController.error(
          res,
          400,
          400,
          "Invalid email or password",
          {}
        );
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = "Invalid email or password";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        ResponseController.error(
          res,
          400,
          400,
          "Invalid email or password",
          {}
        );
      }

      const payload = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        email: user.email,
      };

      const token = createToken(payload);

      apilog.resbody = JSON.stringify(userExtractor(user, token));
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        "Login successful",
        userExtractor(user, token)
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Login unsuccessful";

      ResponseController.error(res, 400, 400, "Login unsuccessful", err);
    }
  }

  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof UserController
   */
  static async getAllUsers(req, res) {
    const apilog = {
      name: `${UserController.parameters.toLowerCase()}.getAllUsers`,
      refid: randString(`${UserController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${UserController.parameters} retrieved successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };
    try {
      const payload = await User.findAll({
        attributes: [
          "id",
          "firstname",
          "lastname",
          "email",
          "phone",
          "createdAt",
        ],
        include: [
          {
            model: Role,
            as: "roles",
            attributes: ["id", "name"],
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
        `${UserController.parameters} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${UserController.parameters} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${UserController.parameters} could not be retrieved`,
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
   * @memberof UserController
   */
  static async getUser(req, res) {
    const apilog = {
      name: `${UserController.parameters.toLowerCase()}.getUser`,
      refid: randString(`${UserController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${UserController.parameter} retrieved successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const {
        user: {
          id, firstname, lastname, email, phone, roles, updatedAt
        },
      } = req;

      const payload = {
        id,
        firstname,
        lastname,
        email,
        phone,
        updatedAt,
      };

      if (roles.length < 1) {
        payload.role = "Role not assigned yet";
      } else {
        payload.role = roles[0].name;
      }

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${UserController.parameter} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${UserController.parameter} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${UserController.parameter} could not be retrieved`,
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
   * @memberof UserController
   */
  static async updateUser(req, res) {
    const apilog = {
      name: `${UserController.parameters.toLowerCase()}.updateUser`,
      refid: randString(`${UserController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${UserController.parameter} updated successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = validUpdate(req.body);
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

      const { user } = req;

      const payload = await user.update(req.body);

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${UserController.parameter} updated successfully`,
        userExtractor(payload)
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${UserController.parameter} could not be updated`;

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
        `${UserController.parameter} could not be updated`,
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
   * @memberof UserController
   */
  static async assignrole(req, res) {
    const apilog = {
      name: `${UserController.parameters.toLowerCase()}.assignrole`,
      refid: randString(`${UserController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 201,
      statuscode: 201,
      message: "Role assigned successfully",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { id } = req.body;
      const user = await User.findOne({ where: { id } });

      const payload = await user.addRole(req.body.role);

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        "Role assigned successfully",
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Role could not be assigned";
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        "Role could not be assigned",
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
   * @memberof UserController
   */
  static async unassignrole(req, res) {
    const apilog = {
      name: `${UserController.parameters.toLowerCase()}.unassignrole`,
      refid: randString(`${UserController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: "Role unassigned successfully",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { id } = req.body;
      const user = await User.findOne({ where: { id } });

      const payload = await user.removeRole(req.body.role);

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        "Role unassigned successfully",
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Role could not be unassigned";
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        "Role could not be unassigned",
        err
      );
    }
  }
}

UserController.parameter = "User";
UserController.parameters = "Users";

export default UserController;
