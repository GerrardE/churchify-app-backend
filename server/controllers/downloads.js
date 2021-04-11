import validationResponse from '@validations/validationResponse';
import validDownload from '@validations/download';
import models from '@models';
import ResponseController from '@helpers/response';

const { Download } = models;

/**
 * Download Controller
 * @async
 * @class DownloadController
 */
class DownloadController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof DownloadController
   */
  static async create(req, res) {
    try {
      const { errors, isValid } = validDownload(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors,
        });
      }

      const { id: userid } = req.decoded;

      const payload = await Download.create({ userid, ...req.body });

      ResponseController.success(
        res,
        200,
        200,
        `${DownloadController.parameter} created successfully`,
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
        `${DownloadController.parameter} could not be created`,
        err
      );
    }
  }

  /**
   * Get all Downloads
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof DownloadController
   */
  static async getAll(req, res) {
    const payload = await Download.findAll();

    ResponseController.success(
      res,
      200,
      200,
      `${DownloadController.parameters} retrieved successfully`,
      payload
    );
  }

  /**
   * Get a download
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof DownloadController
   */
  static async getById(req, res) {
    try {
      const { download } = req;
      const { id } = download;
      const payload = await Download.findOne({ where: { id } });

      ResponseController.success(
        res,
        200,
        200,
        `${DownloadController.parameter} retrieved successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${DownloadController.parameter} could not be retrieved`,
        err
      );
    }
  }

  /**
   * Update a Download
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof DownloadController
   */
  static async update(req, res) {
    try {
      const { errors, isValid } = validDownload(req.body);
      // Check Validation
      if (!isValid) {
        ResponseController.error(res, 400, 400, 'Error: invalid input', errors);
      }

      const { download } = req;
      const { userid, id } = download;

      await Download.update(req.body, {
        returning: true,
        where: { id, userid },
      });

      const payload = await Download.findAll();

      ResponseController.success(
        res,
        200,
        200,
        `${DownloadController.parameter} updated successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${DownloadController.parameter} could not be updated`,
        err
      );
    }
  }

  /**
   * Delete an Download
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof DownloadController
   */
  static async delete(req, res) {
    try {
      const { download } = req;
      const { id, userid } = download;
      await Download.destroy({ where: { id, userid } });
      const payload = await Download.findAll();

      ResponseController.success(
        res,
        200,
        200,
        `${DownloadController.parameter} deleted successfully`,
        payload
      );
    } catch (err) {
      ResponseController.error(
        res,
        400,
        400,
        `${DownloadController.parameter} could not be deleted`,
        err
      );
    }
  }
}

DownloadController.parameter = 'Download';
DownloadController.parameters = 'Downloads';

export default DownloadController;
