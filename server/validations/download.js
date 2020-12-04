import validator from 'validator';
import isEmpty from '../middlewares/isEmpty';

const validEvent = (data) => {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.url = !isEmpty(data.url) ? data.url : '';
  data.date = !isEmpty(data.date) ? data.date : '';
  data.categoryid = !isEmpty(data.categoryid) ? data.categoryid : '';
  data.notes = !isEmpty(data.notes) ? data.notes : '';

  // name validations
  if (!validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = 'name must be between 2 and 20 characters';
  }

  if (isEmpty(data.name)) {
    errors.name = 'name field is required';
  }

  // url validations
  if (!validator.isURL(data.url)) {
    errors.url = 'url must be valid';
  }

  // date validations
  if (isEmpty(data.date)) {
    errors.date = 'date field is required';
  }

  // category validations
  if (isEmpty(data.categoryid)) {
    errors.category = 'category field is required';
  }

  // notes validations
  if (!validator.isLength(data.notes, { min: 5, max: 200 })) {
    errors.notes = 'notes must be between 5 and 200 characters';
  }

  if (isEmpty(data.notes)) {
    errors.notes = 'notes field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validEvent;
