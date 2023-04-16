import validator from "validator";
import isEmpty from "../middlewares/isEmpty";

const validTrainingType = (data, isEdit = false) => {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.branchid = !isEmpty(data.branchid) ? data.branchid : "";

  // name validations
  if (!validator.isLength(data.name, { min: 2, max: 100 }) && !isEdit) {
    errors.name = "name must be between 2 and 100 characters";
  }

  if (isEmpty(data.name) && !isEdit) {
    errors.name = "name field is required";
  }
  
  // branch validations
  if (isEmpty(data.branchid)) {
    errors.branch = "branch field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validTrainingType;
