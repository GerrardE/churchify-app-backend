import validator from "validator";
import isEmpty from "../middlewares/isEmpty";

const validPermission = (data, isEdit = false) => {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";

  // name validations
  if (!validator.isLength(data.name, { min: 2, max: 50 }) && !isEdit) {
    errors.name = "name must be between 2 and 50 characters";
  }

  if (isEmpty(data.name) && !isEdit) {
    errors.name = "name field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validPermission;
