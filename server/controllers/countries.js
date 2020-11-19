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

    return res.status(200).json({
      status: 200,
      message: 'Countries retrieved successfully',
      payload,
    });
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

    return res.status(200).json({
      status: 200,
      message: 'Country retrieved successfully',
      payload,
    });
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

    return res.status(200).json({
      status: 200,
      message: 'Country retrieved successfully',
      payload,
    });
  }
}

export default CountryController;
