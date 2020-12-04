/**
 * @class ResponseController
 */
class ResponseController {
  /**
   * @static
   * @param {*} res
   * @param {*} code
   * @param {*} status
   * @param {*} message
   * @param {*} payload
   * @returns {object} object
   * @memberof ResponseController
   */
  static success(res, code = 200, status = 200, message = 'Successful', payload = {}) {
    return res.status(code).json({
      status,
      message,
      payload,
    });
  }

  /**
   * @static
   * @param {*} res
   * @param {*} code
   * @param {*} status
   * @param {*} message
   * @param {*} errors
   * @returns {object} object
   * @memberof ResponseController
   */
  static error(res, code = 200, status = 200, message = 'Successful', errors = {}) {
    return res.status(code).json({
      status,
      message,
      errors,
    });
  }
}

export default ResponseController;
