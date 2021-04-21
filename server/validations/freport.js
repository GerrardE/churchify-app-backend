import validator from "validator";
import isEmpty from "../middlewares/isEmpty";

const validFreport = (data) => {
  const errors = {};
  data.newcells = !isEmpty(data.newcells) ? data.newcells : "";
  data.totalcells = !isEmpty(data.totalcells) ? data.totalcells : "";
  data.attendance = !isEmpty(data.attendance) ? data.attendance : "";
  data.fellowshipid = !isEmpty(data.fellowshipid) ? data.fellowshipid : "";
  data.branchid = !isEmpty(data.branchid) ? data.branchid : "";
  data.zoneid = !isEmpty(data.zoneid) ? data.zoneid : "";
  data.date = !isEmpty(data.date) ? data.date : "";
  data.notes = !isEmpty(data.notes) ? data.notes : "";

  // newcells validations
  if (isEmpty(data.newcells)) {
    errors.newcells = "newcells field is required";
  }

  // totalcells validations
  if (isEmpty(data.totalcells)) {
    errors.totalcells = "totalcells field is required";
  }

  // attendance validations
  if (isEmpty(data.attendance)) {
    errors.attendance = "attendance field is required";
  }

  // fellowship validations
  if (isEmpty(data.fellowshipid)) {
    errors.fellowship = "fellowship field is required";
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

export default validFreport;
