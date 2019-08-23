import validator from 'validator';
import isEmpty from '../middlewares/isEmpty';

const validGroup = (data) => {
  const errors = {};
  data.cmf = !isEmpty(data.cmf) ? data.cmf : '';
  data.cwf = !isEmpty(data.cwf) ? data.cwf : '';
  data.cyf = !isEmpty(data.cyf) ? data.cyf : '';
  data.rcf = !isEmpty(data.rcf) ? data.rcf : '';
  data.branchId = !isEmpty(data.branchId) ? data.branchId : '';
  data.notes = !isEmpty(data.notes) ? data.notes : '';

  // cmf validations
  if (validator.isEmpty(data.cmf)) {
    errors.cmf = 'cmf field is required';
  }

  // cwf validations
  if (validator.isEmpty(data.cwf)) {
    errors.cwf = 'cwf field is required';
  }

  // cyf validations
  if (validator.isEmpty(data.cyf)) {
    errors.cyf = 'cyf field is required';
  }

  // rcf validations
  if (validator.isEmpty(data.rcf)) {
    errors.rcf = 'rcf field is required';
  }

  // branch validations
  if (validator.isEmpty(data.branchId)) {
    errors.branch = 'branch field is required';
  }

  // notes validations
  if (!validator.isLength(data.notes, { min: 5, max: 200 })) {
    errors.notes = 'notes must be between 5 and 200 characters';
  }

  if (validator.isEmpty(data.notes)) {
    errors.notes = 'notes field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validGroup;
