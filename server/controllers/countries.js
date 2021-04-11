import ResponseController from '@helpers/response';
import models from '@models';

const { Country } = models;

/**
 * Country Controller
 * @async
 * @class CountryController
 */
class CountryController {
  /**
   * Get countries
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof CountryController
   */
  static async getAll(req, res) {
    const payload = await Country.findAll();

    return ResponseController.success(res, 200, 200, 'Countries retrieved successfully', payload);
  }

  /**
   * Get a country item
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof CountryController
   */
  static async getById(req, res) {
    const { country } = req;
    const { id } = country;
    const payload = await Country.findOne({ where: { id } });

    return ResponseController.success(res, 200, 200, 'Country retrieved successfully', payload);
  }

  /**
   * Get a country item
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof CountryController
   */
  static async getByName(req, res) {
    const { country } = req;
    const { name } = country;
    const payload = await Country.findOne({ where: { name } });

    return ResponseController.success(res, 200, 200, 'Country retrieved successfully', payload);
  }
}

export default CountryController;
