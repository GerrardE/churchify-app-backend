import validationResponse from '@validations/validationResponse';
import validCategory from '@validations/category';
import models from '@models';

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
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const { id: userId } = req.decoded;

      const payload = await Category.create({
        userId, ...req.body
      });

      res.status(201).json({
        status: 201,
        message: 'Category created successfully',
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
        errors: 'Category creation unsuccessful'
      });
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

    return res.status(200).json({
      status: 200,
      message: 'Categories retrieved successfully',
      payload
    });
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
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const { category } = req;
      const { userId, id } = category;

      await Category.update(req.body, { returning: true, where: { id, userId } });

      const payload = await Category.findAll();
      res.status(200).json({
        status: 200,
        message: 'Category updated successfully',
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Category could not be updated'
      });
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
      const { id, userId } = category;
      await Category.destroy({ where: { id, userId } });
      const payload = await Category.findAll();

      res.status(200).json({
        status: 200,
        message: 'Category deleted successfully',
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Category could not be deleted'
      });
    }
  }
}

export default CategoryController;
