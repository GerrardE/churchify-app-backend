import validator from "validator";
import isEmpty from "../middlewares/isEmpty";

const validState = (data) => {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.country_id = !isEmpty(data.country_id) ? data.country_id : "";
  data.country_code = !isEmpty(data.country_code) ? data.country_code : "";
  data.fips_code = !isEmpty(data.fips_code) ? data.fips_code : "";
  data.iso2 = !isEmpty(data.iso2) ? data.iso2 : "";
  data.flag = !isEmpty(data.flag) ? data.flag : "";
  data.wikiDataId = !isEmpty(data.wikiDataId) ? data.wikiDataId : "";

  // name validations
  if (!validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = "name must be between 2 and 20 characters";
  }

  if (isEmpty(data.name)) {
    errors.name = "name field is required";
  }

  // country validations
  if (isEmpty(data.country_id)) {
    errors.country_id = "country field is required";
  }

  if (isEmpty(data.country_code)) {
    errors.country_code = "country code field is required";
  }

  if (isEmpty(data.fips_code)) {
    errors.fips_code = "fips_code field is required";
  }

  if (isEmpty(data.iso2)) {
    errors.iso2 = "iso2 field is required";
  }

  if (isEmpty(data.wikiDataId)) {
    errors.wikiDataId = "wikiDataId field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validState;
