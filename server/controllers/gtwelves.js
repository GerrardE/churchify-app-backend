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


  /**
   * Get all Gtwelves
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof GtwelveController
   */
  static async getAll(req, res) {
    const payload = await Gtwelve.findAll();

    return res.status(200).json({
      status: 200,
      message: 'Gtwelves retrieved successfully',
      payload
    });
  }

  /**
   * Update a Gtwelve
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof GtwelveController
   */
  static async update(req, res) {
    try {
      const { errors, isValid } = validGtwelve(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const { gtwelve } = req;
      const { userId, id } = gtwelve;

      await Gtwelve.update(req.body, { returning: true, where: { id, userId } });

      const payload = await Gtwelve.findAll();
      res.status(200).json({
        status: 200,
        message: 'Gtwelve updated successfully',
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Gtwelve could not be updated'
      });
    }
  }

  /**
   * Delete a Gtwelve
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof GtwelveController
   */
  static async delete(req, res) {
    try {
      const { gtwelve } = req;
      const { id, userId } = gtwelve;
      await Gtwelve.destroy({ where: { id, userId } });
      const payload = await Gtwelve.findAll();

      res.status(200).json({
        status: 200,
        message: 'Gtwelve deleted successfully',
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Gtwelve could not be deleted'
      });
    }
  }
}

export default GtwelveController;
