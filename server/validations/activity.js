import validator from 'validator';
import isEmpty from '../middlewares/isEmpty';

const validActivity = (data) => {
  const errors = {};
  data.council = !isEmpty(data.council) ? data.council : '';
  data.special = !isEmpty(data.special) ? data.special : '';
  data.project = !isEmpty(data.project) ? data.project : '';
  data.branchId = !isEmpty(data.branchId) ? data.branchId : '';
  data.notes = !isEmpty(data.notes) ? data.notes : '';

  // council validations
  if (validator.isEmpty(data.council)) {
    errors.council = 'council field is required';
  }

  // special validations
  if (validator.isEmpty(data.special)) {
    errors.special = 'special field is required';
  }

  // project validations
  if (validator.isEmpty(data.project)) {
    errors.project = 'project field is required';
  }

  // branch validations
  if (validator.isEmpty(data.branchId)) {
    errors.branch = 'branch field is required';
  }

  // notes validations
  if (!validator.isLength(data.notes, { min: 5, max: 200 })) {
    errors.notes = 'notes must be between 5 and 200 characters';
  }

  if (validator.isEmpty(data.notes)) {
    errors.notes = 'notes field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validActivity;
