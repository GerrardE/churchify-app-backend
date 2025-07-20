import validator from "validator";
import isEmpty from "../middlewares/isEmpty";

const validEmail = (data) => {
  const errors = {};

  // Ensure email exists and set to empty string if not provided
  data.email = !isEmpty(data.email) ? data.email : "";

  // Email validations
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default { validEmail };
