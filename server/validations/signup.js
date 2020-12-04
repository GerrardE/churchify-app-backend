import validator from 'validator';
import isEmpty from '../middlewares/isEmpty';

const validSignup = (data) => {
  const errors = {};
  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.branchid = !isEmpty(data.branchid) ? data.branchid : '';
  data.country = !isEmpty(data.country) ? data.country : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // First name validations
  if (!validator.isLength(data.firstname, { min: 2, max: 200 })) {
    errors.firstname = 'first name must be between 2 and 100 characters';
  }

  if (isEmpty(data.firstname)) {
    errors.firstname = 'first name field is required';
  }

  // Last name validations
  if (!validator.isLength(data.lastname, { min: 2, max: 200 })) {
    errors.lastname = 'last name must be between 2 and 100 characters';
  }

  if (isEmpty(data.lastname)) {
    errors.lastname = 'last name field is required';
  }

  // phone validation
  if (!validator.isLength(data.phone, { min: 5, max: 15 })) {
    errors.phone = 'phone must be between 5 and 15 characters';
  }

  if (isEmpty(data.phone)) {
    errors.phone = 'phone field is required';
  }

  // Email validations
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  // branch validation
  if (isEmpty(data.branchid)) {
    errors.branchid = 'branch field is required';
  }

  // Country validation
  if (isEmpty(data.country)) {
    errors.country = 'Country field is required';
  }

  // Password validations
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 to 30 characters';
  }

  if (isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validSignup;
