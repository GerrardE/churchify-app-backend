import validPreacher from '@validations/preacher';
import models from '@models';
import ResponseController from '@helpers/response';

const { Preacher } = models;

/**
 * Preacher Controller
 * @async
 * @class PreacherController
 */
class PreacherController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof PreacherController
   */
  static async create(req, res) {
    try {
      const { errors, isValid } = validPreacher(req.body);
      // Check Validation
      if (!isValid) {
        ResponseController.error(res, 400, 400, 'Error: invalid input', errors);
      }

      const { id: userid } = req.decoded;

      const payload = await Preacher.create({ userid, ...req.body });

      ResponseController.success(
        res,
        201,
        201,
        `${PreacherController.parameter} created successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${PreacherController.parameter} creation unsuccessful`,
        err
      );
    }
  }

  /**
   * Get all Preachers
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof PreacherController
   */
  static async getAll(req, res) {
    const payload = await Preacher.findAll();

    ResponseController.success(
      res,
      200,
      200,
      `${PreacherController.parameters} retrieved successfully`,
      payload
    );
  }

  /**
   * Get a preacher
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof PreacherController
   */
  static async getById(req, res) {
    try {
      const { preacher } = req;
      const { id } = preacher;
      const payload = await Preacher.findOne({ where: { id } });

      ResponseController.success(
        res,
        200,
        200,
        `${PreacherController.parameter} retrieved successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${PreacherController.parameter} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Update a preacher
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof PreacherController
   */
  static async update(req, res) {
    try {
      const { errors, isValid } = validPreacher(req.body);
      // Check Validation
      if (!isValid) {
        ResponseController.error(res, 400, 400, 'Error: invalid input', errors);
      }

      const { preacher } = req;
      const { userid, id } = preacher;

      await Preacher.update(req.body, {
        returning: true,
        where: { id, userid },
      });

      const payload = await Preacher.findAll();

      ResponseController.success(
        res,
        200,
        200,
        `${PreacherController.parameter} updated successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${PreacherController.parameter} could not be updated`,
        err
      );
    }
  }

  /**
   * Delete a preacher
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof PreacherController
   */
  static async delete(req, res) {
    try {
      const { preacher } = req;
      const { id, userid } = preacher;
      await Preacher.destroy({ where: { id, userid } });
      const payload = await Preacher.findAll();

      ResponseController.success(
        res,
        200,
        200,
        `${PreacherController.parameter} deleted successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${PreacherController.parameter} could not be deleted`,
        err
      );
    }
  }
}

PreacherController.parameter = 'Preacher';
PreacherController.parameters = 'Preachers';

export default PreacherController;
