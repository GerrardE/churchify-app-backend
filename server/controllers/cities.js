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

    return res.status(200).json({
      status: 200,
      message: 'City retrieved successfully',
      payload,
    });
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
      return res.status(200).json({
        status: 200,
        message: 'Cities retrieved successfully',
        payload,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: 'Cities could not be retrieved',
      });
    }
  }
}

export default CityController;
