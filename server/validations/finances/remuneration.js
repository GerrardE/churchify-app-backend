import validator from "validator";
import isEmpty from "../../middlewares/isEmpty";

const validRemuneration = (data) => {
  const errors = {};

  data.financeid = !isEmpty(data.financeid) ? data.financeid : "";
  data.pastorpaid = !isEmpty(data.pastorpaid) ? data.pastorpaid : "";
  data.fulltimepastorcount = !isEmpty(data.fulltimepastorcount) ? data.fulltimepastorcount : "";

  // pastorpaid validations
  if (isEmpty(data.pastorpaid)) {
    errors.pastorpaid = "pastorpaid field is required";
  }

  // fulltimepastorcount validations
  if (isEmpty(data.fulltimepastorcount)) {
    errors.fulltimepastorcount = "fulltimepastorcount field is required";
  }

  // uploads validations
  if (isEmpty(data.uploads)) {
    errors.uploads = "please upload all supporting documents e.g receipts";
  }

  // finance validations
  if (isEmpty(data.financeid)) {
    errors.finance = "finance field is required";
  }

  // notes validations
  if (!validator.isLength(data.notes, { min: 5, max: 200 })) {
    errors.notes = "notes must be between 5 and 200 characters";
  }

  if (isEmpty(data.notes)) {
    errors.notes = "notes field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validRemuneration;
