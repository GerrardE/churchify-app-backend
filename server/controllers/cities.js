import ResponseController from '@helpers/response';
import models from '@models';

const { City } = models;

/**
 * City Controller
 * @async
 * @class CityController
 */
class CityController {
  /**
   * Get a City item by id
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof CityController
   */
  static async getById(req, res) {
    const { city } = req;
    const { id } = city;
    const payload = await City.findOne({ where: { id } });

    return ResponseController.success(
      res,
      200,
      200,
      `${CityController.parameter} retrieved successfully`,
      payload
    );
  }

  /**
   * Get City items by state id
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof CityController
   */
  static async getByStateId(req, res) {
    try {
      const { state } = req;
      const { id } = state;
      const payload = await City.findAll({ where: { state_id: id } });

      return ResponseController.success(
        res,
        200,
        200,
        `${CityController.parameters} retrieved successfully`,
        payload
      );
    } catch (err) {
      return ResponseController.error(
        res,
        400,
        400,
        `${CityController.parameter} could not be retrieved`,
        err
      );
    }
  }
}

CityController.parameter = 'City';
CityController.parameters = 'Cities';

export default CityController;
