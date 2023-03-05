import validator from "validator";
import isEmpty from "../../middlewares/isEmpty";

const validFinance = (data) => {
  const errors = {};

  data.preacherid = !isEmpty(data.preacherid) ? data.preacherid : "";
  data.zoneid = !isEmpty(data.zoneid) ? data.zoneid : "";
  data.branchid = !isEmpty(data.branchid) ? data.branchid : "";
  data.name = !isEmpty(data.name) ? data.name : "";

  // zoneid validations
  if (isEmpty(data.zoneid)) {
    errors.zoneid = "zone field is required";
  }

  // branchid validations
  if (isEmpty(data.branchid)) {
    errors.branchid = "branch field is required";
  }

  // name validations
  if (isEmpty(data.name)) {
    errors.name = "name field is required";
  }

  // uploads validations
  if (isEmpty(data.uploads)) {
    errors.uploads = "please upload all supporting documents e.g receipts";
  }

  // finance validations
  if (isEmpty(data.preacherid)) {
    errors.finance = "finance field is required";
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
