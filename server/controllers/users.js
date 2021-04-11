import userExtractor from '@helpers/userExtractor';
import { createToken } from '@middlewares/Token';
import { validSignup, validUpdate } from '@validations/signup';
import validSignin from '@validations/signin';
import validationResponse from '@validations/validationResponse';
import ResponseController from '@helpers/response';
import bcrypt from 'bcryptjs';
import models from '@models';

const { User, Role, Permission } = models;

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
    try {
      const { errors, isValid } = validSignup(req.body);
      // Check Validation
      if (!isValid) {
        return ResponseController.error(res, 400, 400, 'Error: invalid input', errors);
      }

      const user = await User.create(req.body);

      const payload = {
        id: user.id,
        email: user.email,
      };

      const token = await createToken(payload);

      return ResponseController.success(
        res,
        200,
        200,
        'Registration successful',
        userExtractor(user, token)
      );
    } catch (err) {
      if (err.errors && err.errors[0].type === 'unique violation') {
        return ResponseController.error(res, 400, 400, validationResponse(err), err);
      }

      return ResponseController.error(res, 400, 400, 'Registration unsuccessful', err);
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
    try {
      const { errors, isValid } = validSignin(req.body);
      // Check Validation
      if (!isValid) {
        return ResponseController.error(
          res,
          400,
          400,
          'Invalid email or password',
          errors
        );
      }

      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
        include: [
          {
            attributes: ['id', 'name'],
            model: Role,
            as: 'roles',
            include: {
              model: Permission,
              as: 'permissions',
            },
          },
        ],
      });

      if (!user) {
        return ResponseController.error(
          res,
          400,
          400,
          'Invalid email or password',
          {}
        );
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return ResponseController.error(
          res,
          400,
          400,
          'Invalid email or password',
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

      return ResponseController.success(
        res,
        200,
        200,
        'Login successful',
        userExtractor(user, token)
      );
    } catch (err) {
      return ResponseController.error(res, 400, 400, 'Login unsuccessful', err);
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
    try {
      const payload = await User.findAll({
        attributes: [
          'id',
          'firstname',
          'lastname',
          'email',
          'phone',
          'createdAt',
        ],
        include: [
          {
            model: Role,
            as: 'roles',
            attributes: ['id', 'name'],
          },
        ],
      });

      return ResponseController.success(
        res,
        200,
        200,
        `${UserController.parameters} retrieved successfully`,
        payload
      );
    } catch (err) {
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
  static async getUser(req, res) {
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
        payload.role = 'Role not assigned yet';
      } else {
        payload.role = roles[0].name;
      }

      return ResponseController.success(
        res,
        200,
        200,
        `${UserController.parameter} retrieved successfully`,
        payload
      );
    } catch (err) {
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
  static async updateUser(req, res) {
    try {
      const { errors, isValid } = validUpdate(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors,
        });
      }

      const { user } = req;

      const payload = await user.update(req.body);

      return ResponseController.success(
        res,
        200,
        200,
        `${UserController.parameter} updated successfully`,
        userExtractor(payload)
      );
    } catch (err) {
      if (err.errors && err.errors[0].type === 'unique violation') {
        return ResponseController.error(
          res,
          400,
          400,
          validationResponse(err),
          err
        );
      }
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
  static async assignrole(req, res) {
    try {
      const { id } = req.body;
      const user = await User.findOne({ where: { id } });

      const payload = await user.addRole(req.body.role);

      return ResponseController.success(
        res,
        200,
        200,
        'Role assigned successfully',
        payload
      );
    } catch (err) {
      return ResponseController.error(
        res,
        400,
        400,
        'Role could not be assigned',
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
    try {
      const { id } = req.body;
      const user = await User.findOne({ where: { id } });

      const payload = await user.removeRole(req.body.role);

      return ResponseController.success(
        res,
        200,
        200,
        'Role unassigned successfully',
        payload
      );
    } catch (err) {
      return ResponseController.error(
        res,
        400,
        400,
        'Role could not be unassigned',
        err
      );
    }
  }
}

UserController.parameter = 'User';
UserController.parameters = 'Users';

export default UserController;
