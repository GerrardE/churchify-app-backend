import { v4 } from 'uuid';
import randString from '@helpers/utilities';
import validationResponse from '@validations/validationResponse';
import validCategory from '@validations/category';
import models from '@models';
import ResponseController from '@helpers/response';

const { Category, ApiLogs } = models;

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
    const apilog = {
      name: `${CategoryController.parameters.toLowerCase()}.create`,
      refid: randString(`${CategoryController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 201,
      statuscode: 201,
      message: `${CategoryController.parameter} created successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };
    try {
      const { errors, isValid } = validCategory(req.body);
      // Check Validation
      if (!isValid) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = 'Error: invalid input';
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        ResponseController.error(res, 400, 400, 'Error: invalid input', errors);
      }

      const { id: userid } = req.decoded;

      const payload = await Category.create({
        userid,
        ...req.body,
      });

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        201,
        201,
        `${CategoryController.parameter} created successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${CategoryController.parameter} could not be created`;

      if (err.errors && err.errors[0].type === 'unique violation') {
        apilog.message = JSON.stringify(validationResponse(err));
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        ResponseController.error(res, 400, 400, validationResponse(err), err);
      }

      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });
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
    const apilog = {
      name: `${CategoryController.parameters.toLowerCase()}.getAll`,
      refid: randString(`${CategoryController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 200,
      statuscode: 200,
      message: `${CategoryController.parameters} retrieved successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    try {
      const payload = await Category.findAll();

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${CategoryController.parameters} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${CategoryController.parameters} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.error(
        res,
        400,
        400,
        `${CategoryController.parameters} could not be retrieved`,
        err
      );
    }
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
    const { category: payload } = req;

    const apilog = {
      name: `${CategoryController.parameters.toLowerCase()}.getById`,
      refid: randString(`${CategoryController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 200,
      statuscode: 200,
      message: `${CategoryController.parameter} retrieved successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    try {
      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${CategoryController.parameter} retrieved successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${CategoryController.parameter} could not be retrieved`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

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
    const apilog = {
      name: `${CategoryController.parameters.toLowerCase()}.update`,
      refid: randString(`${CategoryController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 200,
      statuscode: 200,
      message: `${CategoryController.parameter} updated successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    try {
      const { errors, isValid } = validCategory(req.body, true);
      // Check Validation
      if (!isValid) {
        apilog.resbody = JSON.stringify(errors);
        apilog.httpstatuscode = 400;
        apilog.statuscode = 400;
        apilog.message = 'Error: invalid input';
        apilog.reqendtime = Date.now();
        await ApiLogs.create({ ...apilog });
        ResponseController.error(res, 400, 400, 'Error: invalid input', errors);
      }

      const { category } = req;
      const { userid, id } = category;

      await Category.update(req.body, {
        returning: true,
        where: { id, userid },
      });

      const payload = await Category.findAll();

      apilog.resbody = JSON.stringify(payload);
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${CategoryController.parameter} updated successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${CategoryController.parameter} could not be updated`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

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
    const apilog = {
      name: `${CategoryController.parameters.toLowerCase()}.delete`,
      refid: randString(`${CategoryController.parameter.toUpperCase()}`),
      reqbody: JSON.stringify(req.body),
      resbody: '',
      httpstatuscode: 200,
      statuscode: 200,
      message: `${CategoryController.parameter} deleted successfully`,
      apiref: v4(),
      url: `${req.method} ~ ${req.originalUrl}`,
      reqstarttime: Date.now(),
      reqendtime: '',
    };

    try {
      const { category } = req;
      const { id, userid } = category;
      await Category.destroy({ where: { id, userid } });
      const payload = await Category.findAll();

      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

      ResponseController.success(
        res,
        200,
        200,
        `${CategoryController.parameter} deleted successfully`,
        payload
      );
    } catch (err) {
      apilog.resbody = JSON.stringify(err);
      apilog.httpstatuscode = 400;
      apilog.statuscode = 400;
      apilog.message = `${CategoryController.parameter} could not be deleted`;
      apilog.reqendtime = Date.now();
      await ApiLogs.create({ ...apilog });

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
