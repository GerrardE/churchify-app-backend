import validator from "validator";
import isEmpty from "../middlewares/isEmpty";

const validCountry = (data) => {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.phonecode = !isEmpty(data.phonecode) ? data.phonecode : "";
  data.capital = !isEmpty(data.capital) ? data.capital : "";
  data.currency = !isEmpty(data.currency) ? data.currency : "";
  data.native = !isEmpty(data.native) ? data.native : "";
  data.region = !isEmpty(data.region) ? data.region : "";
  data.subregion = !isEmpty(data.subregion) ? data.subregion : "";
  data.emoji = !isEmpty(data.emoji) ? data.emoji : "";
  data.emojiU = !isEmpty(data.emojiU) ? data.emojiU : "";
  data.iso2 = !isEmpty(data.iso2) ? data.iso2 : "";
  data.iso3 = !isEmpty(data.iso3) ? data.iso3 : "";
  data.flag = !isEmpty(data.flag) ? data.flag : "";
  data.wikiDataId = !isEmpty(data.wikiDataId) ? data.wikiDataId : "";

  // name validations
  if (!validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = "name must be between 2 and 20 characters";
  }

  if (isEmpty(data.name)) {
    errors.name = "name field is required";
  }

  // phonecode validations
  if (isEmpty(data.phonecode)) {
    errors.phonecode = "phonecode field is required";
  }

  // capital validations
  if (isEmpty(data.capital)) {
    errors.capital = "capital field is required";
  }

  // currency validations
  if (isEmpty(data.currency)) {
    errors.currency = "currency field is required";
  }

  // region validations
  if (isEmpty(data.region)) {
    errors.region = "region field is required";
  }

  // subregion validations
  if (isEmpty(data.subregion)) {
    errors.subregion = "subregion field is required";
  }

  // emoji validations
  if (isEmpty(data.emoji)) {
    errors.emoji = "emoji field is required";
  }

  // emojiU validations
  if (isEmpty(data.emojiU)) {
    errors.emojiU = "emojiU field is required";
  }

  // Iso validations
  if (isEmpty(data.iso2)) {
    errors.iso2 = "iso2 field is required";
  }

  if (isEmpty(data.iso3)) {
    errors.iso3 = "iso3 field is required";
  }

  if (isEmpty(data.wikiDataId)) {
    errors.wikiDataId = "wikiDataId field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validCountry;
