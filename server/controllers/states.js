import ResponseController from '@helpers/response';
import models from '@models';

const { State } = models;

/**
 * State Controller
 * @async
 * @class StateController
 */
class StateController {
  /**
   * Get a state item by id
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof StateController
   */
  static async getById(req, res) {
    const { state } = req;
    const { id } = state;
    const payload = await State.findOne({ where: { id } });

    ResponseController.success(
      res,
      200,
      200,
      `${StateController.parameter} retrieved successfully`,
      payload
    );
  }

  /**
   * Get a state item by country id
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof StateController
   */
  static async getByCountryId(req, res) {
    const { state } = req;
    const { id } = state;
    const payload = await State.findAll({ where: { country_id: id } });

    ResponseController.success(
      res,
      200,
      200,
      `${StateController.parameters} retrieved successfully`,
      payload
    );
  }
}

StateController.parameter = 'State';
StateController.parameters = 'States';

export default StateController;
