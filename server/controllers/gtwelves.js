import validationResponse from '@validations/validationResponse';
import validGtwelve from '@validations/gtwelve';
import models from '@models';

const { Gtwelve } = models;

/**
 * Gtwelve Controller
 * @async
 * @class GtwelveController
 */
class GtwelveController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof GtwelveController
   */
  static async create(req, res) {
    try {
      const { errors, isValid } = validGtwelve(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const { id: userId } = req.decoded;
      const {
        name, country, description, branchId, city, address, state
      } = req.body;

      const payload = await Gtwelve.create({
        userId, name, description, branchId, city, address, state, country
      });

      res.status(201).json({
        status: 201,
        message: 'Gtwelve created successfully',
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
        errors: 'Gtwelve creation unsuccessful'
      });
    }
  }
}

export default GtwelveController;
