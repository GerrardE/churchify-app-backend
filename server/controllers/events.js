import validationResponse from '@validations/validationResponse';
import validEvent from '@validations/event';
import models from '@models';
import ResponseController from '@helpers/response';

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
        ResponseController.error(res, 400, 400, 'Error: invalid input', errors);
      }

      const { id: userid } = req.decoded;

      const payload = await Event.create({ userid, ...req.body });

      ResponseController.success(
        res,
        201,
        201,
        `${EventController.parameter} created successfully`,
        payload
      );
    } catch (err) {
      if (err.errors && err.errors[0].type === 'unique violation') {
        ResponseController.error(res, 400, 400, validationResponse(err), err);
      }

      ResponseController.error(
        res,
        400,
        400,
        `${EventController.parameter} creation unsuccessful`,
        err
      );
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
    try {
      const payload = await Event.findAll();

      ResponseController.success(
        res,
        200,
        200,
        `${EventController.parameters} retrieved successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${EventController.parameters} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Get an event
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof EventController
   */
  static async getById(req, res) {
    try {
      const { event } = req;
      const { id } = event;
      const payload = await Event.findOne({ where: { id } });

      ResponseController.success(
        res,
        200,
        200,
        `${EventController.parameter} retrieved successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${EventController.parameter} could not be retrieved`,
        err
      );
    }
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
        ResponseController.error(res, 400, 400, 'Error: invalid input', errors);
      }

      const { event } = req;
      const { userid, id } = event;

      await Event.update(req.body, { returning: true, where: { id, userid } });

      const payload = await Event.findAll();

      ResponseController.success(
        res,
        200,
        200,
        `${EventController.parameter} updated successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${EventController.parameter} could not be updated`,
        err
      );
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
      const { id, userid } = event;
      await Event.destroy({ where: { id, userid } });
      const payload = await Event.findAll();

      ResponseController.success(
        res,
        200,
        200,
        `${EventController.parameter} deleted successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${EventController.parameter} could not be deleted`,
        err
      );
    }
  }
}

EventController.parameters = 'Events';
EventController.parameter = 'Event';

export default EventController;
