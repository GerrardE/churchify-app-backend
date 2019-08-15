import validationResponse from '@validations/validationResponse';
import validBranch from '@validations/branch';
import models from '@models';

const { Branch } = models;

/**
 * Branch Controller
 * @async
 * @class BranchController
 */
class BranchController {
  /**
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof BranchController
   */
  static async create(req, res) {
    try {
      const { errors, isValid } = validBranch(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const { id: userId } = req.decoded;
      const {
        zoneId, name, country, address, city, state, description
      } = req.body;

      const payload = await Branch.create({
        userId, zoneId, name, country, address, city, state, description
      });

      res.status(201).json({
        status: 201,
        message: 'Branch created successfully',
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
        errors: 'Branch creation unsuccessful'
      });
    }
  }
}

export default BranchController;
