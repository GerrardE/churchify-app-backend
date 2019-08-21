import validator from 'validator';
import isEmpty from '../middlewares/isEmpty';

const validEvent = (data) => {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.month = !isEmpty(data.month) ? data.month : '';
  data.year = !isEmpty(data.year) ? data.year : '';
  data.branchId = !isEmpty(data.branchId) ? data.branchId : '';
  data.description = !isEmpty(data.description) ? data.description : '';

  // name validations
  if (!validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = 'name must be between 2 and 20 characters';
  }

  if (validator.isEmpty(data.name)) {
    errors.name = 'name field is required';
  }

  // month validations
  if (validator.isEmpty(data.month)) {
    errors.month = 'month field is required';
  }

  // year validations
  if (validator.isEmpty(data.year)) {
    errors.year = 'year field is required';
  }

  // branch validations
  if (validator.isEmpty(data.branchId)) {
    errors.branch = 'branch field is required';
  }

  // description validations
  if (!validator.isLength(data.description, { min: 5, max: 200 })) {
    errors.description = 'description must be between 5 and 200 characters';
  }

  if (validator.isEmpty(data.description)) {
    errors.description = 'description field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validEvent;
