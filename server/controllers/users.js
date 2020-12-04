import userExtractor from '@helpers/userExtractor';
import { createToken } from '@middlewares/Token';
import validSignup from '@validations/signup';
import validSignin from '@validations/signin';
import validationResponse from '@validations/validationResponse';
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
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const user = await User.create(req.body);

      const payload = {
        id: user.id,
        email: user.email
      };

      const token = await createToken(payload);
      res.status(201).json({
        status: 201,
        message: 'Registration successful',
        user: userExtractor(user, token)
      });
    } catch (err) {
      if (err.errors && err.errors[0].type === 'unique violation') {
        return res.status(400).json({
          status: 400,
          errors: validationResponse(err)
        });
      }

      return res.status(400).json({
        status: 400,
        errors: 'Registration unsuccessful',
        err
      });
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
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email
        },
        include: [
          {
            through: {
              attributes: ['name']
            },
            attributes: ['name'],
            model: Role,
            as: 'roles',
            include: {
              model: Permission,
              as: 'permissions',
              through: {
                attributes: ['name']
              },
              attributes: ['name']
            }
          }
        ]
      });

      if (!user) {
        return res.status(400).json({
          status: 400,
          errors: 'Invalid email or password'
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(400).json({
          status: 400,
          errors: 'Invalid email or password'
        });
      }

      const payload = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        email: user.email,
        role: user.roles[0],
      };
      const token = createToken(payload);
      res.status(200).json({
        status: 200, message: 'Login successful', user: userExtractor(user, token)
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Login unsuccessful'
      });
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
      const { id } = req.decoded;
      const user = await User.findOne({ where: { id } });

      const payload = await user.addRole(req.body.role);

      return res.status(201).json({
        status: 201,
        message: 'Role assigned successfully',
        payload,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Role could not be assigned',
        err
      });
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
      const { id } = req.decoded;
      const user = await User.findOne({ where: { id } });

      const payload = await user.removeRole(req.body.role);

      return res.status(200).json({
        status: 200,
        message: 'Role unassigned successfully',
        payload,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Role could not be unassigned',
        message: err.original.detail,
      });
    }
  }
}

export default UserController;
