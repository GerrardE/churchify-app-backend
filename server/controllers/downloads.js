import validationResponse from '@validations/validationResponse';
import validDownload from '@validations/download';
import models from '@models';

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
          errors
        });
      }

      const { id: userid } = req.decoded;

      const payload = await Download.create({ userid, ...req.body });

      res.status(201).json({
        status: 201,
        message: 'Download created successfully',
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
        errors: 'Download creation unsuccessful'
      });
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

    return res.status(200).json({
      status: 200,
      message: 'Downloads retrieved successfully',
      payload
    });
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

      return res.status(200).json({
        status: 200,
        message: 'Download retrieved successfully',
        payload,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Download could not be retrieved',
        err,
      });
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
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const { download } = req;
      const { userid, id } = download;

      await Download.update(req.body, { returning: true, where: { id, userid } });

      const payload = await Download.findAll();
      res.status(200).json({
        status: 200,
        message: 'Download updated successfully',
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Download could not be updated'
      });
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

      res.status(200).json({
        status: 200,
        message: 'Download deleted successfully',
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Download could not be deleted'
      });
    }
  }
}

export default DownloadController;
