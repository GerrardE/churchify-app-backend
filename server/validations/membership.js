import validator from "validator";
import isEmpty from "../middlewares/isEmpty";

const validMembership = (data) => {
  const errors = {};
  data.adults = !isEmpty(data.adults) ? data.adults : "";
  data.children = !isEmpty(data.children) ? data.children : "";
  data.tithers = !isEmpty(data.tithers) ? data.tithers : "";
  data.branchid = !isEmpty(data.branchid) ? data.branchid : "";
  data.zoneid = !isEmpty(data.zoneid) ? data.zoneid : "";
  data.date = !isEmpty(data.date) ? data.date : "";
  data.newmembers = !isEmpty(data.newmembers) ? data.newmembers : "";

  // adult validations
  if (isEmpty(data.adults)) {
    errors.adults = "adults field is required";
  }

  // children validations
  if (isEmpty(data.children)) {
    errors.children = "children field is required";
  }

  // tithers validations
  if (isEmpty(data.tithers)) {
    errors.tithers = "tithers field is required";
  }

  // newmembers validations
  if (isEmpty(data.newmembers)) {
    errors.newmembers = "newmembers field is required";
  }

  // branch validations
  if (isEmpty(data.branchid)) {
    errors.branch = "branch field is required";
  }

  // zone validations
  if (isEmpty(data.zoneid)) {
    errors.zone = "zone field is required";
  }

  // date validations
  if (isEmpty(data.date)) {
    errors.date = "date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validMembership;
