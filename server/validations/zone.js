import validator from "validator";
import isEmpty from "../middlewares/isEmpty";

const validZone = (data, isEdit = false) => {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.country = !isEmpty(data.country) ? data.country : "";

  // name validations
  if (!validator.isLength(data.name, { min: 2, max: 20 }) && !isEdit) {
    errors.name = "name must be between 2 and 20 characters";
  }

  if (isEmpty(data.name) && !isEdit) {
    errors.name = "name field is required";
  }

  // country validations
  if (isEmpty(data.country)) {
    errors.country = "country field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validZone;
