import validPreacher from '@validations/preacher';
import models from '@models';

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
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const { id: userid } = req.decoded;

      const payload = await Preacher.create({ userid, ...req.body });

      res.status(201).json({
        status: 201,
        message: 'Preacher created successfully',
        payload
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        errors: 'Preacher creation unsuccessful'
      });
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

    return res.status(200).json({
      status: 200,
      message: 'Preachers retrieved successfully',
      payload
    });
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
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const { preacher } = req;
      const { userid, id } = preacher;

      await Preacher.update(req.body, { returning: true, where: { id, userid } });

      const payload = await Preacher.findAll();
      res.status(200).json({
        status: 200,
        message: 'Preacher updated successfully',
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Preacher could not be updated'
      });
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

      res.status(200).json({
        status: 200,
        message: 'Preacher deleted successfully',
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Preacher could not be deleted'
      });
    }
  }
}

export default PreacherController;
