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
import validEmail from "@validations/forgotPassword";
import validPassword from "@validations/resetPassword";
import sendEmail from "@helpers/mailer";

const {
  User, Role, Permission, ApiLogs, Branch, Zone, ForgotPassword
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
  static async signup(req, res, next) {
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
        const errorvals = JSON.stringify(Object.values(errors).join(", "));
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = errorvals;
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        return ResponseController.error(res, 400, 400, errorvals, errors);
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

      return ResponseController.success(
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
        return ResponseController.error(res, 400, 400, validationResponse(err), err);
      }

      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(res, 400, 400, "Registration unsuccessful", err);
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
  static async signin(req, res, next) {
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
        return ResponseController.error(res, 400, 400, "Error: invalid input", errors);
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
        return ResponseController.error(
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
        return ResponseController.error(
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

      user.zone = await Zone.findOne({
        where: { id: user.zoneid },
        attributes: ["id", "name"]
      });

      user.branch = await Branch.findOne({
        where: { id: user.branchid },
        attributes: ["id", "name"]
      });

      const token = createToken(payload);

      apilog.resbody = JSON.stringify(userExtractor(user, token));
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
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

      return ResponseController.error(res, 400, 400, "Login unsuccessful", err);
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
  static async getAllUsers(req, res, next) {
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
        order: [["createdAt", "DESC"]],
        attributes: [
          "id",
          "firstname",
          "lastname",
          "email",
          "phone",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            model: Role,
            as: "roles",
            attributes: ["name"],
          },
        ],
      });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
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

      return ResponseController.error(
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
  static async getUser(req, res, next) {
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

      return ResponseController.success(
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

      return ResponseController.error(
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
  static async updateUser(req, res, next) {
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
        return ResponseController.error(res, 400, 400, "Error: invalid input", errors);
      }

      const { user } = req;

      const payload = await user.update(req.body);

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
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

        return ResponseController.error(res, 400, 400, validationResponse(err), err);
      }

      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(
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
  static async assignrole(req, res, next) {
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

      return ResponseController.success(
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

      return ResponseController.error(
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
  static async reassignrole(req, res, next) {
    const apilog = {
      name: `${UserController.parameters.toLowerCase()}.reassignrole`,
      refid: randString(`${UserController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: "Role reassigned successfully",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { id } = req.body;
      const user = await User.findOne({ where: { id } });

      await user.removeRole(req.body.role);

      const payload = await user.addRole(req.body.newrole);

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        200,
        200,
        "Role reassigned successfully",
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = "Role could not be reassigned";
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(
        res,
        400,
        400,
        "Role could not be reassigned",
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
  static async forgotPassword(req, res, next) {
    const apilog = {
      name: `${UserController.parameters.toLowerCase()}.forgotPassword`,
      refid: randString(`${UserController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: "Password reset link sent successfully",
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = validEmail(req.body);
      if (!isValid) {
        const errorvals = Object.values(errors).join(", ");
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = errorvals;
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        return ResponseController.error(res, 400, 400, errorvals, errors);
      }

      const { email } = req.body;

      const userExists = await User.findOne({
        where: { email },
      });

      let forgotPasswordEntry = {};

      if (userExists) {
        const thirtyMins = new Date(Date.now() + 30 * 60 * 1000);

        forgotPasswordEntry = await ForgotPassword.create({
          email: userExists.email,
          expiresAt: thirtyMins,
        });

        const forgotPasswordLink = `${process.env.APP_URL}/reset-password?id=${forgotPasswordEntry.id}`;

        const mailOptions = {
          from: `${process.env.TREM_SENDER_EMAIL}`, // Must be a verified email in AWS SES
          to: userExists.email,
          subject: "Churchify Forgot Password",
          text: "Click the link to reset your password",
          html: `<strong><a href="${forgotPasswordLink}">Click here to reset your password</a></strong>`
        };

        await sendEmail(mailOptions);

        apilog.resbody = JSON.stringify(forgotPasswordEntry);
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
      }

      return ResponseController.success(
        res,
        201, // Created - New forgot password entry made
        201,
        `${UserController.parameter} forgot password url sent successfully`,
        forgotPasswordEntry,
      );
    } catch (err) {
      apilog.reqendtime = Date.now();

      if (err.errors && err.errors[0].type === "unique violation") {
        apilog.resbody = JSON.stringify(validationResponse(err));
        apilog.httpstatuscode = 409;
        apilog.statuscode = 409;
        apilog.message = validationResponse(err);
        await ApiLogs.create({ ...apilog });
        return ResponseController.error(res, 409, 409, validationResponse(err), err);
      }

      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 500; // Internal Server Error - Unexpected error
      apilog.statuscode = 500;
      apilog.message = `Error with ${UserController.parameter} forgot password request`;
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(
        res,
        500,
        500,
        `Error with ${UserController.parameter} forgot password request`,
        err,
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
  static async resetPassword(req, res, next) {
    const apilog = {
      name: `${UserController.parameters.toLowerCase()}.resetPassword`,
      refid: randString(`${UserController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: "",
      httpstatuscode: 200,
      statuscode: 200,
      message: `${UserController.parameter} password reset successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: "",
    };

    try {
      const { errors, isValid } = validPassword(req.body);

      if (!isValid) {
        const errorvals = Object.values(errors).join(", ");
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400; // Bad Request - Invalid password
        apilog.statuscode = 400;
        apilog.message = errorvals;
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        return ResponseController.error(res, 400, 400, errorvals, errors);
      }

      const { password } = req.body;
      const { id } = req.params;

      const forgotPasswordEntry = await ForgotPassword.findOne({
        where: { id },
      });

      if (!forgotPasswordEntry) {
        apilog.resbody = JSON.stringify({ message: "Forgot password entry not found" });
        apilog.httpstatuscode = 404; // Not Found - Invalid/expired reset ID
        apilog.statuscode = 404;
        apilog.message = "Error: Forgot password entry not found";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        return ResponseController.error(res, 404, 404, "Error: Forgot password entry not found", { message: "Forgot password entry not found" });
      }

      if (forgotPasswordEntry.status === "USED") {
        apilog.resbody = JSON.stringify({ message: "Reset link has been used" });
        apilog.httpstatuscode = 410; // Gone - Expired resource
        apilog.statuscode = 410;
        apilog.message = "Error: Reset link has been used";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        return ResponseController.error(res, 410, 410, "Error: Reset link has been used", { message: "Reset link has been used" });
      }

      // Check if the reset link has expired
      if (new Date() > forgotPasswordEntry.expiresAt) {
        apilog.resbody = JSON.stringify({ message: "Reset link has expired" });
        apilog.httpstatuscode = 410; // Gone - Expired resource
        apilog.statuscode = 410;
        apilog.message = "Error: Reset link has expired";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        return ResponseController.error(res, 410, 410, "Error: Reset link has expired", { message: "Reset link has expired" });
      }

      const userExists = await User.findOne({
        where: { email: forgotPasswordEntry.email },
      });

      if (!userExists) {
        apilog.resbody = JSON.stringify({ message: "User not found" });
        apilog.httpstatuscode = 404; // Not Found - User doesn’t exist
        apilog.statuscode = 404;
        apilog.message = "Error: User not found";
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        return ResponseController.error(res, 404, 404, "Error: User not found", { message: "User not found" });
      }

      // Update the user instance directly with the new password
      userExists.password = password; // Set plain text password; hook will hash it
      await userExists.save(); // Save triggers beforeUpdate hook

      // Update Forgot password entry
      forgotPasswordEntry.status = "USED";
      await forgotPasswordEntry.save();

      // await ForgotPassword.update(
      //   { status: "USED" },
      //   { where: { id } }
      // );

      apilog.resbody = JSON.stringify(userExists);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      return ResponseController.success(
        res,
        200,
        200,
        `${UserController.parameter} password reset successful`,
        userExtractor(userExists)
      );
    } catch (error) {
      apilog.reqendtime = Date.now();

      if (error.errors && error.errors[0].type === "unique violation") {
        apilog.resbody = JSON.stringify(validationResponse(error));
        apilog.httpstatuscode = 409; // Conflict - Unique constraint violation (unlikely here)
        apilog.statuscode = 409;
        apilog.message = validationResponse(error);
        await ApiLogs.create({ ...apilog });
        return ResponseController.error(res, 409, 409, validationResponse(error), error);
      }

      apilog.resbody = JSON.stringify(error);
      apilog.httpstatuscode = 500; // Internal Server Error - Unexpected error
      apilog.statuscode = 500;
      apilog.message = `Error resetting ${UserController.parameter} password`;
      await ApiLogs.create({ ...apilog });

      return ResponseController.error(
        res,
        500,
        500,
        `Error resetting ${UserController.parameter} password`,
        error
      );
    }
  }
}

UserController.parameter = "User";
UserController.parameters = "Users";

export default UserController;
