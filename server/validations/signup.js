import validator from 'validator';
import isEmpty from '../middlewares/isEmpty';

const validSignup = (data) => {
  const errors = {};
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.branch = !isEmpty(data.branch) ? data.branch : '';
  data.country = !isEmpty(data.country) ? data.country : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // First name validations
  if (!validator.isLength(data.firstName, { min: 2, max: 200 })) {
    errors.firstName = 'first name must be between 2 and 100 characters';
  }

  if (validator.isEmpty(data.firstName)) {
    errors.firstName = 'first name field is required';
  }

  // Last name validations
  if (!validator.isLength(data.lastName, { min: 2, max: 200 })) {
    errors.lastName = 'last name must be between 2 and 100 characters';
  }

  if (validator.isEmpty(data.lastName)) {
    errors.lastName = 'last name field is required';
  }

  // phone validation
  if (!validator.isLength(data.phone, { min: 5, max: 15 })) {
    errors.phone = 'phone must be between 5 and 15 characters';
  }

  if (validator.isEmpty(data.phone)) {
    errors.phone = 'phone field is required';
  }

  // Email validations
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  // branch validation
  if (validator.isEmpty(data.branch)) {
    errors.branch = 'branch field is required';
  }

  // Country validation
  if (validator.isEmpty(data.country)) {
    errors.country = 'Country field is required';
  }

  // Password validations
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 to 30 characters';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validSignup;
