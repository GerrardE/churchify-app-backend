import validationResponse from '@validations/validationResponse';
import validCategory from '@validations/category';
import models from '@models';
import ResponseController from '@helpers/response';

const { Category } = models;

/**
 * Category Controller
 * @async
 * @class CategoryController
 */
class CategoryController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof CategoryController
   */
  static async create(req, res) {
    try {
      const { errors, isValid } = validCategory(req.body);
      // Check Validation
      if (!isValid) {
        ResponseController.error(res, 400, 400, 'Error: invalid input', errors);
      }

      const { id: userid } = req.decoded;

      const payload = await Category.create({
        userid,
        ...req.body,
      });

      ResponseController.success(
        res,
        201,
        201,
        `${CategoryController.parameter} created successfully`,
        payload
      );
    } catch (err) {
      if (err.errors && err.errors[0].type === 'unique violation') {
        ResponseController.error(
          res,
          400,
          400,
          validationResponse(err),

          err
        );
      }

      ResponseController.error(
        res,
        400,
        400,
        `${CategoryController.parameter} could not be created`,
        err
      );
    }
  }

  /**
   * Get all Categories
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof CategoryController
   */
  static async getAll(req, res) {
    const payload = await Category.findAll();

    ResponseController.success(
      res,
      200,
      200,
      `${CategoryController.parameters} retrieved successfully`,
      payload
    );
  }

  /**
   * Get a category
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof CategoryController
   */
  static async getById(req, res) {
    try {
      const { category } = req;
      const { id } = category;
      const payload = await Category.findOne({ where: { id } });

      ResponseController.success(
        res,
        200,
        200,
        `${CategoryController.parameter} retrieved successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${CategoryController.parameter} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Update an Category
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof CategoryController
   */
  static async update(req, res) {
    try {
      const { errors, isValid } = validCategory(req.body);
      // Check Validation
      if (!isValid) {
        ResponseController.error(res, 400, 400, 'Error: invalid input', errors);
      }

      const { category } = req;
      const { userid, id } = category;

      await Category.update(req.body, {
        returning: true,
        where: { id, userid },
      });

      const payload = await Category.findAll();

      ResponseController.success(
        res,
        200,
        200,
        `${CategoryController.parameter} updated successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${CategoryController.parameter} could not be updated`,
        err
      );
    }
  }

  /**
   * Delete an Category
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof CategoryController
   */
  static async delete(req, res) {
    try {
      const { category } = req;
      const { id, userid } = category;
      await Category.destroy({ where: { id, userid } });
      const payload = await Category.findAll();

      ResponseController.success(
        res,
        200,
        200,
        `${CategoryController.parameter} deleted successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${CategoryController.parameter} could not be deleted`,
        err
      );
    }
  }
}

CategoryController.parameter = 'Category';
CategoryController.parameters = 'Categories';

export default CategoryController;
