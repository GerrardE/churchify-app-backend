import validator from "validator";
import isEmpty from "../middlewares/isEmpty";

const validBranch = (data, isEdit = false) => {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.zoneid = !isEmpty(data.zoneid) ? data.zoneid : "";

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

  // zoneid validations
  if (isEmpty(data.zoneid)) {
    errors.zone = "zone field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validBranch;
