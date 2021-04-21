import validator from "validator";
import isEmpty from "../middlewares/isEmpty";

const validCountry = (data) => {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.type = !isEmpty(data.type) ? data.type : "";
  data.config = !isEmpty(data.config) ? data.config : "";

  // name validations
  if (!validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = "name must be between 2 and 20 characters";
  }

  if (isEmpty(data.name)) {
    errors.name = "name field is required";
  }

  // type validations
  if (!validator.isLength(data.type, { min: 2, max: 20 })) {
    errors.type = "type must be between 2 and 20 characters";
  }

  if (isEmpty(data.type)) {
    errors.type = "type field is required";
  }

  // config validations
  if (isEmpty(data.config)) {
    errors.config = "config field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validCountry;
