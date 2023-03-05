import faker from "faker";
import models from "@models";

const { Payment } = models;

const createTestPayment = async ({
  financeid, userid, nationalofficeremittance,
  hqbuilding,
  zonalhqremittance,
  salariesallowances,
  pastorpension,
  crusadeandmissionary,
  personalwelfare,
  transport,
  accomodation,
  donations,
  entertainment,
  medicalwelfare,
  stationery,
  churchexpenses,
  officeexpenses,
  rentpersonage,
  churchrent,
  telephoneandinternet,
  electricity,
  fuels,
  subscriptions,
  security,
  bankcharges,
  groupexpenses,
  loanadvanced,
  loanrepaid,
  furnituremaintenance,
  eqptmaintenance,
  motormaintenance,
  churchbldmaintenance,
  parsonagemaintenance, uploads,
  notes
}) => {
  const newPayment = await Payment.create({
    financeid: financeid || faker.datatype.number(),
    userid: userid || faker.datatype.number(),
    nationalofficeremittance: nationalofficeremittance || faker.random.alphaNumeric(10),
    hqbuilding: hqbuilding || faker.datatype.number(), // .05 hq building
    zonalhqremittance: zonalhqremittance || faker.datatype.number(), // .05 zonal hq
    salariesallowances: salariesallowances || faker.datatype.number(),
    pastorpension: pastorpension || faker.datatype.number(),
    crusadeandmissionary: crusadeandmissionary || faker.datatype.number(),
    personalwelfare: personalwelfare || faker.datatype.number(),
    transport: transport || faker.datatype.number(),
    accomodation: accomodation || faker.datatype.number(),
    donations: donations || faker.datatype.number(),
    entertainment: entertainment || faker.datatype.number(),
    medicalwelfare: medicalwelfare || faker.datatype.number(),
    stationery: stationery || faker.datatype.number(),
    churchexpenses: churchexpenses || faker.datatype.number(),
    officeexpenses: officeexpenses || faker.datatype.number(),
    rentpersonage: rentpersonage || faker.datatype.number(),
    churchrent: churchrent || faker.datatype.number(),
    telephoneandinternet: telephoneandinternet || faker.datatype.number(),
    electricity: electricity || faker.datatype.number(),
    fuels: fuels || faker.datatype.number(),
    subscriptions: subscriptions || faker.datatype.number(),
    security: security || faker.datatype.number(),
    bankcharges: bankcharges || faker.datatype.number(),
    groupexpenses: groupexpenses || faker.datatype.number(),
    loanadvanced: loanadvanced || faker.datatype.number(),
    loanrepaid: loanrepaid || faker.datatype.number(),
    furnituremaintenance: furnituremaintenance || faker.datatype.number(),
    eqptmaintenance: eqptmaintenance || faker.datatype.number(),
    motormaintenance: motormaintenance || faker.datatype.number(),
    churchbldmaintenance: churchbldmaintenance || faker.datatype.number(),
    parsonagemaintenance: parsonagemaintenance || faker.datatype.number(),
    uploads: uploads || [JSON.parse(faker.datatype.json())],
    notes: notes || faker.random.alphaNumeric(10),
  });

  return (newPayment);
};

export default createTestPayment;
