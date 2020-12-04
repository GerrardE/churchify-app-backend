import validator from 'validator';
import isEmpty from '../middlewares/isEmpty';

const validTraining = (data) => {
  const errors = {};
  data.converts = !isEmpty(data.converts) ? data.converts : '';
  data.trainees = !isEmpty(data.trainees) ? data.trainees : '';
  data.branchid = !isEmpty(data.branchid) ? data.branchid : '';
  data.notes = !isEmpty(data.notes) ? data.notes : '';

  // trainees validations
  if (isEmpty(data.trainees)) {
    errors.trainees = 'trainees field is required';
  }

  // converts validations
  if (isEmpty(data.converts)) {
    errors.converts = 'converts field is required';
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

export default validTraining;
