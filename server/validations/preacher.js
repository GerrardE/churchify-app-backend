import validator from 'validator';
import isEmpty from '../middlewares/isEmpty';

const validPreacher = (data) => {
  const errors = {};
  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
  data.country = !isEmpty(data.country) ? data.country : '';
  data.state = !isEmpty(data.state) ? data.state : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.branchId = !isEmpty(data.branchId) ? data.branchId : '';
  data.description = !isEmpty(data.description) ? data.description : '';

  // firstname validations
  if (!validator.isLength(data.firstname, { min: 2, max: 20 })) {
    errors.firstname = 'firstname must be between 2 and 20 characters';
  }

  if (validator.isEmpty(data.firstname)) {
    errors.firstname = 'firstname field is required';
  }

  // lastname validations
  if (!validator.isLength(data.lastname, { min: 2, max: 20 })) {
    errors.lastname = 'lastname must be between 2 and 20 characters';
  }

  if (validator.isEmpty(data.lastname)) {
    errors.lastname = 'lastname field is required';
  }

  // country validations
  if (validator.isEmpty(data.country)) {
    errors.country = 'country field is required';
  }

  // state validations
  if (validator.isEmpty(data.state)) {
    errors.state = 'state field is required';
  }

  // address validations
  if (!validator.isLength(data.address, { min: 5, max: 200 })) {
    errors.address = 'address must be between 5 and 200 characters';
  }

  if (validator.isEmpty(data.address)) {
    errors.address = 'address field is required';
  }

  // city validations
  if (validator.isEmpty(data.city)) {
    errors.city = 'city field is required';
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

export default validPreacher;
