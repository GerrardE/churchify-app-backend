import validator from "validator";
import isEmpty from "../middlewares/isEmpty";

const validPassword = (data) => {
  const errors = {};

  // Ensure password exists and set to empty string if not provided
  data.password = !isEmpty(data.password) ? data.password : "";

  // Password validations
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default { validPassword };
