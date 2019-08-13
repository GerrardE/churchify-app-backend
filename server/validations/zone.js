import validator from 'validator';
import isEmpty from '../middlewares/isEmpty';

const validZone = (data) => {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.country = !isEmpty(data.country) ? data.country : '';
  data.description = !isEmpty(data.description) ? data.description : '';

  // name validations
  if (!validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = 'name must be between 2 and 20 characters';
  }

  if (validator.isEmpty(data.name)) {
    errors.name = 'name field is required';
  }

  // country validations
  if (validator.isEmpty(data.country)) {
    errors.country = 'country field is required';
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

export default validZone;
