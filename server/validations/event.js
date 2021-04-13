import validator from 'validator';
import isEmpty from '../middlewares/isEmpty';

const validEvent = (data, isEdit = false) => {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.date = !isEmpty(data.date) ? data.date : '';
  data.branchid = !isEmpty(data.branchid) ? data.branchid : '';
  data.notes = !isEmpty(data.notes) ? data.notes : '';

  // name validations
  if (!validator.isLength(data.name, { min: 2, max: 100 }) && !isEdit) {
    errors.name = 'name must be between 2 and 100 characters';
  }

  if (isEmpty(data.name) && !isEdit) {
    errors.name = 'name field is required';
  }

  // date validations
  if (isEmpty(data.date)) {
    errors.date = 'date field is required';
  }

  // branch validations
  if (isEmpty(data.branchid)) {
    errors.branch = 'branch field is required';
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
