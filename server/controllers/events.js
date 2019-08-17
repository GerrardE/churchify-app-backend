import validationResponse from '@validations/validationResponse';
import validEvent from '@validations/event';
import models from '@models';

const { Event } = models;

/**
 * Event Controller
 * @async
 * @class EventController
 */
class EventController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof EventController
   */
  static async create(req, res) {
    try {
      const { errors, isValid } = validEvent(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const { id: userId } = req.decoded;
      const {
        branchId, name, month, year, description
      } = req.body;

      const payload = await Event.create({
        userId, branchId, name, month, year, description
      });

      res.status(201).json({
        status: 201,
        message: 'Event created successfully',
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
        errors: 'Event creation unsuccessful'
      });
    }
  }

  /**
   * Get all events
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof EventController
   */
  static async getAll(req, res) {
    const payload = await Event.findAll();

    return res.status(200).json({
      status: 200,
      message: 'Events retrieved successfully',
      payload
    });
  }

  /**
   * Update an event
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof EventController
   */
  static async update(req, res) {
    try {
      const { errors, isValid } = validEvent(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const { event } = req;
      const { userId, id } = event;

      await Event.update(
        req.body, { returning: true, where: { id, userId } }
      );

      const payload = await Event.findAll();
      res.status(200).json({
        status: 200,
        message: 'Event updated successfully',
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Event could not be updated'
      });
    }
  }

  /**
   * Delete an event
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof EventController
   */
  static async delete(req, res) {
    try {
      const { event } = req;
      const { id, userId } = event;
      await Event.destroy({ where: { id, userId } });
      const payload = await Event.findAll();

      res.status(200).json({
        status: 200,
        message: 'Event deleted successfully',
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Event could not be deleted'
      });
    }
  }
}

export default EventController;
