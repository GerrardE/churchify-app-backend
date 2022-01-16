import validator from "validator";
import isEmpty from "../middlewares/isEmpty";

const validGroup = (data) => {
  const errors = {};

  data.cmf = !isEmpty(data.cmf) ? data.cmf : "";
  data.cwf = !isEmpty(data.cwf) ? data.cwf : "";
  data.gymcf = !isEmpty(data.gymcf) ? data.gymcf : "";
  data.ywcf = !isEmpty(data.ywcf) ? data.ywcf : "";
  data.yaf = !isEmpty(data.yaf) ? data.yaf : "";
  data.teens = !isEmpty(data.teens) ? data.teens : "";
  data.rcf = !isEmpty(data.rcf) ? data.rcf : "";
  data.branchid = !isEmpty(data.branchid) ? data.branchid : "";
  data.notes = !isEmpty(data.notes) ? data.notes : "";

  // cmf validations
  if (isEmpty(data.cmf)) {
    errors.cmf = "cmf field is required";
  }

  // cwf validations
  if (isEmpty(data.cwf)) {
    errors.cwf = "cwf field is required";
  }

  // gymcf validations
  if (isEmpty(data.gymcf)) {
    errors.gymcf = "gymcf field is required";
  }

  // ywcf validations
  if (isEmpty(data.ywcf)) {
    errors.ywcf = "ywcf field is required";
  }

  // yaf validations
  if (isEmpty(data.yaf)) {
    errors.yaf = "yaf field is required";
  }

  // teens validations
  if (isEmpty(data.teens)) {
    errors.teens = "teens field is required";
  }

  // rcf validations
  if (isEmpty(data.rcf)) {
    errors.rcf = "rcf field is required";
  }

  // branch validations
  if (isEmpty(data.branchid)) {
    errors.branch = "branch field is required";
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

export default validGroup;
