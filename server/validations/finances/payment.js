import validator from "validator";
import isEmpty from "../../middlewares/isEmpty";

const validPayment = (data) => {
  const errors = {};

  data.financeid = !isEmpty(data.financeid) ? data.financeid : "";
  data.nationaloffcieremittance = !isEmpty(data.nationaloffcieremittance) ? data.nationaloffcieremittance : "";
  data.hqbuilding = !isEmpty(data.hqbuilding) ? data.hqbuilding : "";
  data.zonalhqremittance = !isEmpty(data.zonalhqremittance) ? data.zonalhqremittance : "";
  data.salariesallowancies = !isEmpty(data.salariesallowancies) ? data.salariesallowancies : "";
  data.pastorpension = !isEmpty(data.pastorpension) ? data.pastorpension : "";
  data.crusadeandmissionary = !isEmpty(data.crusadeandmissionary) ? data.crusadeandmissionary : "";
  data.personalwelfare = !isEmpty(data.personalwelfare) ? data.personalwelfare : "";
  data.transport = !isEmpty(data.transport) ? data.transport : "";
  data.accomodation = !isEmpty(data.accomodation) ? data.accomodation : "";
  data.donations = !isEmpty(data.donations) ? data.donations : "";
  data.entertainment = !isEmpty(data.entertainment) ? data.entertainment : "";
  data.medicalwelfare = !isEmpty(data.medicalwelfare) ? data.medicalwelfare : "";
  data.stationery = !isEmpty(data.stationery) ? data.stationery : "";
  data.churchexpenses = !isEmpty(data.churchexpenses) ? data.churchexpenses : "";
  data.rentpersonage = !isEmpty(data.rentpersonage) ? data.rentpersonage : "";
  data.rentpersonage = !isEmpty(data.rentpersonage) ? data.rentpersonage : "";
  data.churchrent = !isEmpty(data.churchrent) ? data.churchrent : "";
  data.telephoneandinternet = !isEmpty(data.telephoneandinternet) ? data.telephoneandinternet : "";
  data.electricity = !isEmpty(data.electricity) ? data.electricity : "";
  data.fuels = !isEmpty(data.fuels) ? data.fuels : "";
  data.subscriptions = !isEmpty(data.subscriptions) ? data.subscriptions : "";
  data.security = !isEmpty(data.security) ? data.security : "";
  data.bankcharges = !isEmpty(data.bankcharges) ? data.bankcharges : "";
  data.groupexpenses = !isEmpty(data.groupexpenses) ? data.groupexpenses : "";
  data.loanadvanced = !isEmpty(data.loanadvanced) ? data.loanadvanced : "";
  data.loanrepaid = !isEmpty(data.loanrepaid) ? data.loanrepaid : "";
  data.furnituremaintenance = !isEmpty(data.furnituremaintenance) ? data.furnituremaintenance : "";
  data.eqptmaintenance = !isEmpty(data.eqptmaintenance) ? data.eqptmaintenance : "";
  data.motormaintenance = !isEmpty(data.motormaintenance) ? data.motormaintenance : "";
  data.churchbldmaintenance = !isEmpty(data.churchbldmaintenance) ? data.churchbldmaintenance : "";
  data.personagemaintenance = !isEmpty(data.personagemaintenance) ? data.personagemaintenance : "";
  data.uploads = !isEmpty(data.uploads) ? data.uploads : "";
  data.notes = !isEmpty(data.notes) ? data.notes : "";

  // nationaloffcieremittance validations
  if (isEmpty(data.nationaloffcieremittance)) {
    errors.nationaloffcieremittance = "nationaloffcieremittance field is required";
  }

  // hqbuilding validations
  if (isEmpty(data.hqbuilding)) {
    errors.hqbuilding = "hqbuilding field is required";
  }

  // zonalhqremittance validations
  if (isEmpty(data.zonalhqremittance)) {
    errors.zonalhqremittance = "zonalhqremittance field is required";
  }

  // salariesallowancies validations
  if (isEmpty(data.salariesallowancies)) {
    errors.salariesallowancies = "salariesallowancies field is required";
  }

  // pastorpension validations
  if (isEmpty(data.pastorpension)) {
    errors.pastorpension = "pastorpension field is required";
  }

  // crusadeandmissionary validations
  if (isEmpty(data.crusadeandmissionary)) {
    errors.crusadeandmissionary = "crusadeandmissionary field is required";
  }

  // personalwelfare validations
  if (isEmpty(data.personalwelfare)) {
    errors.personalwelfare = "personalwelfare field is required";
  }

  // transport validations
  if (isEmpty(data.transport)) {
    errors.transport = "transport field is required";
  }

  // accomodation validations
  if (isEmpty(data.accomodation)) {
    errors.accomodation = "accomodation field is required";
  }

  // donations validations
  if (isEmpty(data.donations)) {
    errors.donations = "donations field is required";
  }

  // entertainment validations
  if (isEmpty(data.entertainment)) {
    errors.entertainment = "entertainment field is required";
  }

  // medicalwelfare validations
  if (isEmpty(data.medicalwelfare)) {
    errors.medicalwelfare = "medicalwelfare field is required";
  }

  // stationery validations
  if (isEmpty(data.stationery)) {
    errors.stationery = "stationery field is required";
  }

  // churchexpenses validations
  if (isEmpty(data.churchexpenses)) {
    errors.churchexpenses = "churchexpenses field is required";
  }

  // rentpersonage validations
  if (isEmpty(data.rentpersonage)) {
    errors.rentpersonage = "rentpersonage field is required";
  }

  // churchrent validations
  if (isEmpty(data.churchrent)) {
    errors.churchrent = "churchrent field is required";
  }

  // telephoneandinternet validations
  if (isEmpty(data.telephoneandinternet)) {
    errors.telephoneandinternet = "telephoneandinternet field is required";
  }

  // electricity validations
  if (isEmpty(data.electricity)) {
    errors.electricity = "electricity field is required";
  }

  // fuels validations
  if (isEmpty(data.fuels)) {
    errors.fuels = "fuels field is required";
  }

  // subscriptions validations
  if (isEmpty(data.subscriptions)) {
    errors.subscriptions = "subscriptions field is required";
  }

  // security validations
  if (isEmpty(data.security)) {
    errors.security = "security field is required";
  }

  // bankcharges validations
  if (isEmpty(data.bankcharges)) {
    errors.bankcharges = "bankcharges field is required";
  }

  // groupexpenses validations
  if (isEmpty(data.groupexpenses)) {
    errors.groupexpenses = "groupexpenses field is required";
  }

  // loanadvanced validations
  if (isEmpty(data.loanadvanced)) {
    errors.loanadvanced = "loanadvanced field is required";
  }

  // loanrepaid validations
  if (isEmpty(data.loanrepaid)) {
    errors.loanrepaid = "loanrepaid field is required";
  }

  // furnituremaintenance validations
  if (isEmpty(data.furnituremaintenance)) {
    errors.furnituremaintenance = "furnituremaintenance field is required";
  }

  // eqptmaintenance validations
  if (isEmpty(data.eqptmaintenance)) {
    errors.eqptmaintenance = "eqptmaintenance field is required";
  }

  // motormaintenance validations
  if (isEmpty(data.motormaintenance)) {
    errors.motormaintenance = "motormaintenance field is required";
  }

  // motormaintenance validations
  if (isEmpty(data.motormaintenance)) {
    errors.motormaintenance = "motormaintenance field is required";
  }

  // churchbldmaintenance validations
  if (isEmpty(data.churchbldmaintenance)) {
    errors.churchbldmaintenance = "churchbldmaintenance field is required";
  }

  // personagemaintenance validations
  if (isEmpty(data.personagemaintenance)) {
    errors.personagemaintenance = "personagemaintenance field is required";
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

export default validPayment;
