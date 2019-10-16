import validationResponse from '@validations/validationResponse';
import validFellowship from '@validations/fellowship';
import models from '@models';

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

      const { id: userId } = req.decoded;

      const payload = await Fellowship.create({ userId, ...req.body });

      res.status(201).json({
        status: 201,
        message: 'Fellowship created successfully',
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
        errors: 'Fellowship creation unsuccessful'
      });
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

    return res.status(200).json({
      status: 200,
      message: 'Fellowships retrieved successfully',
      payload
    });
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
      const { userId, id } = fellowship;

      await fellowship.update(req.body, { returning: true, where: { id, userId } });

      const payload = await Fellowship.findAll();
      res.status(200).json({
        status: 200,
        message: 'Fellowship updated successfully',
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Fellowship could not be updated'
      });
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
      const { id, userId } = Fellowship;
      await fellowship.destroy({ where: { id, userId } });
      const payload = await Fellowship.findAll();

      res.status(200).json({
        status: 200,
        message: 'Fellowship deleted successfully',
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Fellowship could not be deleted'
      });
    }
  }
}

export default FellowshipController;
