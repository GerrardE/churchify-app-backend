import validator from "validator";
import isEmpty from "../middlewares/isEmpty";

const validTraining = (data) => {
  const errors = {};
  data.converts = !isEmpty(data.converts) ? data.converts : "";
  data.trainees = !isEmpty(data.trainees) ? data.trainees : "";
  data.branchid = !isEmpty(data.branchid) ? data.branchid : "";
  data.zoneid = !isEmpty(data.zoneid) ? data.zoneid : "";
  data.date = !isEmpty(data.date) ? data.date : "";
  data.trainingtypeid = !isEmpty(data.trainingtypeid) ? data.trainingtypeid : "";
  data.notes = !isEmpty(data.notes) ? data.notes : "";

  // trainees validations
  if (isEmpty(data.trainees)) {
    errors.trainees = "trainees field is required";
  }

  // converts validations
  if (isEmpty(data.converts)) {
    errors.converts = "converts field is required";
  }

  // branch validations
  if (isEmpty(data.branchid)) {
    errors.branch = "branch field is required";
  }

  // date validations
  if (isEmpty(data.date)) {
    errors.date = "date field is required";
  }

  // zone validations
  if (isEmpty(data.zoneid)) {
    errors.zone = "zone field is required";
  }

  // trainingtype validations
  if (isEmpty(data.trainingtypeid)) {
    errors.trainingtype = "trainingtype field is required";
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

export default validTraining;
