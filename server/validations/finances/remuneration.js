import isEmpty from "../../middlewares/isEmpty";

const validRemuneration = (data) => {
  const errors = {};

  data.financeid = !isEmpty(data.financeid) ? data.financeid : "";
  data.pastorpayed = !isEmpty(data.pastorpayed) ? data.pastorpayed : "";
  data.fulltimepastorcount = !isEmpty(data.fulltimepastorcount) ? data.fulltimepastorcount : "";

  // pastorpayed validations
  if (isEmpty(data.pastorpayed)) {
    errors.pastorpayed = "pastorpayed field is required";
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

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validRemuneration;
