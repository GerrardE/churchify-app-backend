import validator from "validator";
import isEmpty from "../middlewares/isEmpty";

const validCity = (data) => {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.state_id = !isEmpty(data.state_id) ? data.state_id : "";
  data.state_code = !isEmpty(data.state_code) ? data.state_code : "";
  data.country_id = !isEmpty(data.country_id) ? data.country_id : "";
  data.country_code = !isEmpty(data.country_code) ? data.country_code : "";
  data.latitude = !isEmpty(data.latitude) ? data.latitude : "";
  data.longitude = !isEmpty(data.longitude) ? data.longitude : "";
  data.flag = !isEmpty(data.flag) ? data.flag : "";
  data.wikiDataId = !isEmpty(data.wikiDataId) ? data.wikiDataId : "";

  // name validations
  if (!validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = "name must be between 2 and 20 characters";
  }

  if (isEmpty(data.name)) {
    errors.name = "name field is required";
  }

  // state validations
  if (isEmpty(data.state_id)) {
    errors.state_id = "state field is required";
  }

  if (isEmpty(data.state_code)) {
    errors.state_code = "state code field is required";
  }

  // country validations
  if (isEmpty(data.country_id)) {
    errors.country_id = "country field is required";
  }

  if (isEmpty(data.country_code)) {
    errors.country_code = "country code field is required";
  }

  if (isEmpty(data.latitude)) {
    errors.latitude = "latitude field is required";
  }

  if (isEmpty(data.longitude)) {
    errors.longitude = "longitude field is required";
  }

  if (isEmpty(data.flag)) {
    errors.flag = "flag field is required";
  }

  if (isEmpty(data.wikiDataId)) {
    errors.wikiDataId = "wikiDataId field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validCity;
