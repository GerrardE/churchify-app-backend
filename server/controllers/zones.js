import validationResponse from '@validations/validationResponse';
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
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const { id: userId } = req.decoded;
      const { name, country, description } = req.body;

      const payload = await Zone.create({
        userId, name, country, description
      });

      res.status(201).json({
        status: 201,
        message: 'Zone created successfully',
        payload
      });
    } catch (err) {
      if (err.errors && err.errors[0].type === 'unique violation') {
        return res.status(400).json({
          status: 400,
          errors: validationResponse(err)
        });
      }

      res.status(400).json({
        status: 400,
        errors: 'Zone creation unsuccessful'
      });
    }
  }
}

export default ZoneController;
