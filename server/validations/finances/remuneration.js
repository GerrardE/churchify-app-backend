import isEmpty from "../../middlewares/isEmpty";

const validRemuneration = (data) => {
  const errors = {};

  data.financeid = !isEmpty(data.financeid) ? data.financeid : "";
  data.pastorpayed = !isEmpty(data.pastorpayed) ? data.pastorpayed : "";
  data.fulltimepastorcount = !isEmpty(data.fulltimepastorcount) ? data.fulltimepastorcount : "";
  data.size = !isEmpty(data.size) ? data.size : 0;

  // pastorpayed validations
  if (isEmpty(data.pastorpayed)) {
    errors.pastorpayed = "pastorpayed field is required";
  }

  // fulltimepastorcount validations
  if (isEmpty(data.fulltimepastorcount)) {
    errors.fulltimepastorcount = "fulltimepastorcount field is required";
  }

  // upload validations
  if (isEmpty(data.originalname)) {
    errors.upload = "please upload all supporting documents e.g receipts";
  }

  if (data.size > 9999999) {
    errors.upload = "upload field must be less than 10 MB";
  }

  // finance validations
  if (isEmpty(data.financeid)) {
    errors.finance = "finance field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validRemuneration;
