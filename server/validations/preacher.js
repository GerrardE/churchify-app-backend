import validator from "validator";
import isEmpty from "../middlewares/isEmpty";

const validPreacher = (data) => {
  const errors = {};
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.branchid = !isEmpty(data.branchid) ? data.branchid : "";

  // firstname validations
  if (!validator.isLength(data.firstname, { min: 2, max: 20 })) {
    errors.firstname = "firstname must be between 2 and 20 characters";
  }

  if (isEmpty(data.firstname)) {
    errors.firstname = "firstname field is required";
  }

  // lastname validations
  if (!validator.isLength(data.lastname, { min: 2, max: 20 })) {
    errors.lastname = "lastname must be between 2 and 20 characters";
  }

  if (isEmpty(data.lastname)) {
    errors.lastname = "lastname field is required";
  }

  // phone validation
  if (!validator.isLength(data.phone, { min: 5, max: 15 })) {
    errors.phone = "phone must be between 5 and 15 characters";
  }

  if (isEmpty(data.phone)) {
    errors.phone = "phone field is required";
  }

  // Email validations
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  // country validations
  if (isEmpty(data.country)) {
    errors.country = "country field is required";
  }

  // state validations
  if (isEmpty(data.state)) {
    errors.state = "state field is required";
  }

  // address validations
  if (!validator.isLength(data.address, { min: 5, max: 200 })) {
    errors.address = "address must be between 5 and 200 characters";
  }

  if (isEmpty(data.address)) {
    errors.address = "address field is required";
  }

  // city validations
  if (isEmpty(data.city)) {
    errors.city = "city field is required";
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

export default validPreacher;
