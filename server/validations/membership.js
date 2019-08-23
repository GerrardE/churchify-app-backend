import validator from 'validator';
import isEmpty from '../middlewares/isEmpty';

const validMembership = (data) => {
  const errors = {};
  data.adults = !isEmpty(data.adults) ? data.adults : '';
  data.children = !isEmpty(data.children) ? data.children : '';
  data.tithers = !isEmpty(data.tithers) ? data.tithers : '';
  data.branchId = !isEmpty(data.branchId) ? data.branchId : '';
  data.newMembers = !isEmpty(data.newMembers) ? data.newMembers : '';
  data.notes = !isEmpty(data.notes) ? data.notes : '';

  // adult validations
  if (validator.isEmpty(data.adults)) {
    errors.adults = 'adults field is required';
  }

  // children validations
  if (validator.isEmpty(data.children)) {
    errors.children = 'children field is required';
  }

  // tithers validations
  if (validator.isEmpty(data.tithers)) {
    errors.tithers = 'tithers field is required';
  }

  // newMembers validations
  if (validator.isEmpty(data.newMembers)) {
    errors.newMembers = 'newMembers field is required';
  }

  // notes validations
  if (!validator.isLength(data.notes, { min: 5, max: 200 })) {
    errors.notes = 'notes must be between 5 and 200 characters';
  }

  if (validator.isEmpty(data.notes)) {
    errors.notes = 'notes field is required';
  }

  // branch validations
  if (validator.isEmpty(data.branchId)) {
    errors.branch = 'branch field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validMembership;
