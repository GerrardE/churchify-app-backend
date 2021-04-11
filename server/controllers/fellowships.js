import validationResponse from '@validations/validationResponse';
import validFellowship from '@validations/fellowship';
import models from '@models';
import ResponseController from '@helpers/response';

const { Fellowship } = models;

/**
 * Fellowship Controller
 * @async
 * @class FellowshipController
 */
class FellowshipController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof FellowshipController
   */
  static async create(req, res) {
    try {
      const { errors, isValid } = validFellowship(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const { id: userid } = req.decoded;

      const payload = await Fellowship.create({ userid, ...req.body });

      ResponseController.success(res, 201, 201, `${FellowshipController.parameter} created successfully`, payload);
    } catch (err) {
      if (err.errors && err.errors[0].type === 'unique violation') {
        ResponseController.error(res, 400, 400, validationResponse(err), err);
      }

      ResponseController.error(res, 400, 400, `${FellowshipController.parameter} creation unsuccessful`, err);
    }
  }

  /**
   * Get all Fellowships
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof FellowshipController
   */
  static async getAll(req, res) {
    const payload = await Fellowship.findAll();

    ResponseController.success(res, 200, 200, `${FellowshipController.parameters} retrieved successfully`, payload);
  }

  /**
   * Get a fellowship
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof FellowshipController
   */
  static async getById(req, res) {
    try {
      const { fellowship } = req;
      const { id } = fellowship;
      const payload = await Fellowship.findOne({ where: { id } });

      ResponseController.success(res, 200, 200, `${FellowshipController.parameter} retrieved successfully`, payload);
    } catch (err) {
      ResponseController.success(res, 400, 400, `${FellowshipController.parameter} could not be retrieved`, err);
    }
  }

  /**
   * Update a Fellowship
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof FellowshipController
   */
  static async update(req, res) {
    try {
      const { errors, isValid } = validFellowship(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const { fellowship } = req;
      const { userid, id } = fellowship;

      await fellowship.update(req.body, { returning: true, where: { id, userid } });

      const payload = await Fellowship.findAll();

      ResponseController.success(res, 200, 200, `${FellowshipController.parameter} updated successfully`, payload);
    } catch (err) {
      ResponseController.success(res, 400, 400, `${FellowshipController.parameter} could not be updated`, err);
    }
  }

  /**
   * Delete a Fellowship
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof FellowshipController
   */
  static async delete(req, res) {
    try {
      const { fellowship } = req;
      const { id, userid } = Fellowship;
      await fellowship.destroy({ where: { id, userid } });
      const payload = await Fellowship.findAll();

      ResponseController.success(res, 200, 200, `${FellowshipController.parameter} deleted successfully`, payload);
    } catch (err) {
      ResponseController.success(res, 400, 400, `${FellowshipController.parameter} could not be deleted`, err);
    }
  }
}

FellowshipController.parameter = 'Fellowship';
FellowshipController.parameters = 'Fellowships';

export default FellowshipController;
