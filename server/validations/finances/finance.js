import validator from "validator";
import isEmpty from "../../middlewares/isEmpty";

const validFinance = (data, isEdit = false) => {
  const errors = {};

  data.preacherid = !isEmpty(data.preacherid) ? data.preacherid : "";
  data.zoneid = !isEmpty(data.zoneid) ? data.zoneid : "";
  data.branchid = !isEmpty(data.branchid) ? data.branchid : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.notes = !isEmpty(data.notes) ? data.notes : "";

  // zoneid validations
  if (isEmpty(data.zoneid)) {
    errors.zoneid = "zone field is required";
  }

  // branchid validations
  if (isEmpty(data.branchid)) {
    errors.branchid = "branch field is required";
  }

  // name validations
  if (!validator.isLength(data.name, { min: 2, max: 100 }) && !isEdit) {
    errors.name = "name must be between 2 and 100 characters";
  }

  if (isEmpty(data.name)) {
    errors.name = "name field is required";
  }

  // preacherid validations
  if (isEmpty(data.preacherid)) {
    errors.preacherid = "preacher field is required";
  }

  // notes validations
  if (!validator.isLength(data.notes, { min: 5, max: 200 })) {
    errors.notes = "notes must be between 5 and 200 characters";
  }

  if (isEmpty(data.notes)) {
    errors.notes = "notes field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validFinance;
