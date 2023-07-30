import validator from "validator";
import isEmpty from "../middlewares/isEmpty";

const validEvent = (data, isEdit = false) => {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.size = !isEmpty(data.size) ? data.size : 0;
  data.date = !isEmpty(data.date) ? data.date : "";
  data.categoryid = !isEmpty(data.categoryid) ? data.categoryid : "";

  // name validations
  if (!validator.isLength(data.name, { min: 2, max: 20 }) && !isEdit) {
    errors.name = "name must be between 2 and 20 characters";
  }

  if (isEmpty(data.name) && !isEdit) {
    errors.name = "name field is required";
  }

  // upload validations
  if (isEmpty(data.originalname)) {
    errors.upload = "please upload all supporting documents e.g receipts";
  }

  if (data.size > 9999999) {
    errors.upload = "upload field must be less than 10 MB";
  }

  // date validations
  if (isEmpty(data.date)) {
    errors.date = "date field is required";
  }

  // category validations
  if (isEmpty(data.categoryid)) {
    errors.category = "category field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validEvent;
