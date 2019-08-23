import validator from 'validator';
import isEmpty from '../middlewares/isEmpty';

const validAttendance = (data) => {
  const errors = {};
  data.men = !isEmpty(data.men) ? data.men : '';
  data.women = !isEmpty(data.women) ? data.women : '';
  data.children = !isEmpty(data.children) ? data.children : '';
  data.eventId = !isEmpty(data.eventId) ? data.eventId : '';
  data.preacherId = !isEmpty(data.preacherId) ? data.preacherId : '';
  data.branchId = !isEmpty(data.branchId) ? data.branchId : '';
  data.notes = !isEmpty(data.notes) ? data.notes : '';

  // children validations
  if (validator.isEmpty(data.children)) {
    errors.children = 'children field is required';
  }

  // women validations
  if (validator.isEmpty(data.women)) {
    errors.women = 'women field is required';
  }

  // men validations
  if (validator.isEmpty(data.men)) {
    errors.men = 'men field is required';
  }

  // event validations
  if (validator.isEmpty(data.eventId)) {
    errors.event = 'event field is required';
  }

  // preacher validations
  if (validator.isEmpty(data.preacherId)) {
    errors.preacher = 'preacher field is required';
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

export default validAttendance;
