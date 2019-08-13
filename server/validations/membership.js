import validator from 'validator';
import isEmpty from '../middlewares/isEmpty';

const validMembership = (data) => {
  const errors = {};
  data.adults = !isEmpty(data.adults) ? data.adults : '';
  data.children = !isEmpty(data.children) ? data.children : '';
  data.tithers = !isEmpty(data.tithers) ? data.tithers : '';
  data.newMembers = !isEmpty(data.newMembers) ? data.newMembers : '';

  // adult validations
  if (!validator.isInt(data.adults)) {
    errors.adults = 'adults* field must be an integer';
  }

  if (validator.isEmpty(data.adults)) {
    errors.adults = 'adults field is required';
  }

  // children validations
  if (!validator.isInt(data.children)) {
    errors.children = 'children* field must be an integer';
  }

  if (validator.isEmpty(data.children)) {
    errors.children = 'children field is required';
  }

  // tithers validations
  if (!validator.isInt(data.tithers)) {
    errors.tithers = 'tithers* field must be an integer';
  }

  if (validator.isEmpty(data.tithers)) {
    errors.tithers = 'tithers field is required';
  }

  // newMembers validations
  if (!validator.isInt(data.newMembers)) {
    errors.newMembers = 'newMembers* field must be an integer';
  }

  if (validator.isEmpty(data.newMembers)) {
    errors.newMembers = 'newMembers field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validMembership;
