import isEmpty from "../../middlewares/isEmpty";

const validAsset = (data) => {
  const errors = {};

  data.financeid = !isEmpty(data.financeid) ? data.financeid : "";
  data.building = !isEmpty(data.building) ? data.building : "";
  data.motorvehicle = !isEmpty(data.motorvehicle) ? data.motorvehicle : "";
  data.generator = !isEmpty(data.generator) ? data.generator : "";
  data.musicaleqpt = !isEmpty(data.musicaleqpt) ? data.musicaleqpt : "";
  data.asabaproject = !isEmpty(data.asabaproject) ? data.asabaproject : "";
  data.others = !isEmpty(data.others) ? data.others : "";
  data.size = !isEmpty(data.size) ? data.size : 0;

  // building validations
  if (isEmpty(data.building)) {
    errors.building = "building field is required";
  }

  // motorvehicle validations
  if (isEmpty(data.motorvehicle)) {
    errors.motorvehicle = "motorvehicle field is required";
  }

  // generator validations
  if (isEmpty(data.generator)) {
    errors.generator = "generator field is required";
  }

  // musicaleqpt validations
  if (isEmpty(data.musicaleqpt)) {
    errors.musicaleqpt = "musicaleqpt field is required";
  }

  // asabaproject validations
  if (isEmpty(data.asabaproject)) {
    errors.asabaproject = "asabaproject field is required";
  }

  // others validations
  if (isEmpty(data.others)) {
    errors.others = "others field is required";
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

export default validAsset;
