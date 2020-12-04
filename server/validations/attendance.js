import validator from 'validator';
import isEmpty from '../middlewares/isEmpty';

const validAttendance = (data) => {
  const errors = {};
  data.men = !isEmpty(data.men) ? data.men : '';
  data.women = !isEmpty(data.women) ? data.women : '';
  data.children = !isEmpty(data.children) ? data.children : '';
  data.eventid = !isEmpty(data.eventid) ? data.eventid : '';
  data.preacherid = !isEmpty(data.preacherid) ? data.preacherid : '';
  data.branchid = !isEmpty(data.branchid) ? data.branchid : '';
  data.notes = !isEmpty(data.notes) ? data.notes : '';

  // children validations
  if (isEmpty(data.children)) {
    errors.children = 'children field is required';
  }

  // women validations
  if (isEmpty(data.women)) {
    errors.women = 'women field is required';
  }

  // men validations
  if (isEmpty(data.men)) {
    errors.men = 'men field is required';
  }

  // event validations
  if (isEmpty(data.eventid)) {
    errors.event = 'event field is required';
  }

  // preacher validations
  if (isEmpty(data.preacherid)) {
    errors.preacher = 'preacher field is required';
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

export default validAttendance;
