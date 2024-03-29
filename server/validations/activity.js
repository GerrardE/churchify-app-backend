import validator from "validator";
import isEmpty from "../middlewares/isEmpty";

const validActivity = (data) => {
  const errors = {};
  data.council = !isEmpty(data.council) ? data.council : "";
  data.special = !isEmpty(data.special) ? data.special : "";
  data.project = !isEmpty(data.project) ? data.project : "";
  data.branchid = !isEmpty(data.branchid) ? data.branchid : "";
  data.zoneid = !isEmpty(data.zoneid) ? data.zoneid : "";
  data.activitytypeid = !isEmpty(data.activitytypeid) ? data.activitytypeid : "";

  // council validations
  if (isEmpty(data.council)) {
    errors.council = "council field is required";
  }

  // special validations
  if (isEmpty(data.special)) {
    errors.special = "special field is required";
  }

  // project validations
  if (isEmpty(data.project)) {
    errors.project = "project field is required";
  }

  // branch validations
  if (isEmpty(data.branchid)) {
    errors.branch = "branch field is required";
  }

  // zone validations
  if (isEmpty(data.zoneid)) {
    errors.zone = "zone field is required";
  }

  // activitytype validations
  if (isEmpty(data.activitytypeid)) {
    errors.activitytype = "activitytype field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validActivity;
