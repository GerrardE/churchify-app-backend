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

      const { id: userid } = req.decoded;

      const payload = await Branch.create({ userid, ...req.body });

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

  /**
   * Get all branches
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @return {json} Returns json object
   * @memberof BranchController
   */
  static async getAll(req, res) {
    const payload = await Branch.findAll();

    return res.status(200).json({
      status: 200,
      message: 'Branches retrieved successfully',
      payload
    });
  }

  /**
   * Update a Branch
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof BranchController
   */
  static async update(req, res) {
    try {
      const { errors, isValid } = validBranch(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors
        });
      }

      const { branch } = req;
      const { userid, id } = branch;

      await Branch.update(req.body, { returning: true, where: { id, userid } });

      const payload = await Branch.findAll();
      res.status(200).json({
        status: 200,
        message: 'Branch updated successfully',
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Branch could not be updated'
      });
    }
  }

  /**
   * Delete a Branch
   * @static
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - The next middleware
   * @return {json} Returns json object
   * @memberof BranchController
   */
  static async delete(req, res) {
    try {
      const { branch } = req;
      const { id, userid } = branch;
      await Branch.destroy({ where: { id, userid } });
      const payload = await Branch.findAll();

      res.status(200).json({
        status: 200,
        message: 'Branch deleted successfully',
        payload
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        errors: 'Branch could not be deleted'
      });
    }
  }
}

export default BranchController;
