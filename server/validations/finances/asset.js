import validator from "validator";
import isEmpty from "../../middlewares/isEmpty";

const validAsset = (data, isEdit=false) => {
  const errors = {};

  data.financeid = !isEmpty(data.financeid) ? data.financeid : "";
  data.building = !isEmpty(data.building) ? data.building : "";
  data.motorvehicle = !isEmpty(data.motorvehicle) ? data.motorvehicle : "";
  data.generator = !isEmpty(data.generator) ? data.generator : "";
  data.musicaleqpt = !isEmpty(data.musicaleqpt) ? data.musicaleqpt : "";
  data.asabaproject = !isEmpty(data.asabaproject) ? data.asabaproject : "";
  data.others = !isEmpty(data.others) ? data.others : "";
  data.uploads = !isEmpty(data.uploads) ? data.uploads : "";
  data.notes = !isEmpty(data.notes) ? data.notes : "";

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

export default validAsset;
