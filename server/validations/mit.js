import validator from 'validator';
import isEmpty from '../middlewares/isEmpty';

const validMit = (data) => {
  const errors = {};
  data.converts = !isEmpty(data.converts) ? data.converts : '';
  data.trainees = !isEmpty(data.trainees) ? data.trainees : '';
  data.branchId = !isEmpty(data.branchId) ? data.branchId : '';
  data.notes = !isEmpty(data.notes) ? data.notes : '';

  // trainees validations
  if (validator.isEmpty(data.trainees)) {
    errors.trainees = 'trainees field is required';
  }

  // converts validations
  if (validator.isEmpty(data.converts)) {
    errors.converts = 'converts field is required';
  }

  // branch validations
  if (validator.isEmpty(data.branchId)) {
    errors.branch = 'branch field is required';
  }

  // notes validations
  if (validator.isEmpty(data.notes)) {
    errors.notes = 'notes field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validMit;
