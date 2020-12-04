import validationResponse from '@validations/validationResponse';
import ResponseController from '@helpers/response';
import validZone from '@validations/zone';
import models from '@models';

const { Zone } = models;

/**
 * Zone Controller
 * @async
 * @class ZoneController
 */
class ZoneController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ZoneController
   */
  static async create(req, res) {
    try {
      const { errors, isValid } = validZone(req.body);
      // Check Validation
      if (!isValid) {
        return ResponseController.error(res, 400, 400, 'invalid request', errors);
      }

      const payload = await Zone.create({ ...req.body });

      ResponseController.success(res, 201, 201, 'Zone created successfully', payload);
    } catch (err) {
      if (err.errors && err.errors[0].type === 'unique violation') {
        return ResponseController.error(res, 400, 400, 'unique violation', validationResponse(err));
      }

      ResponseController.error(res, 400, 400, {}, 'Zone creation unsuccessful');
    }
  }

  /**
   * Get all zones
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof ZoneController
   */
  static async getAll(req, res) {
    try {
      const payload = await Zone.findAll();

      return ResponseController.success(res, 200, 200, 'Zones retrieved successfully', payload);
    } catch (err) {
      return ResponseController.error(res, 400, 400, 'Zones could not be retrieved', err);
    }
  }

  /**
   * Get a zone
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof ZoneController
   */
  static async getById(req, res) {
    const { zone: payload } = req;
    return ResponseController.success(res, 200, 200, 'Zone retrieved successfully', payload);
  }

  /**
   * Update a zone
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ZoneController
   */
  static async update(req, res) {
    try {
      const { errors, isValid } = validZone(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const { zone } = req;
      const { id } = zone;

      await Zone.update(req.body, { returning: true, where: { id } });

      return ResponseController.success(res, 200, 200, 'Zone updated successfully', {});
    } catch (err) {
      return ResponseController.error(res, 400, 400, 'Zone could not be updated', err);
    }
  }

  /**
   * Delete a zone
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof ZoneController
   */
  static async delete(req, res) {
    try {
      const { zone } = req;
      const { id } = zone;
      await Zone.destroy({ where: { id } });

      return ResponseController.success(res, 200, 200, 'Zone deleted successfully', {});
    } catch (err) {
      return ResponseController.error(res, 400, 400, 'Zone could not be deleted', err);
    }
  }
}

export default ZoneController;
