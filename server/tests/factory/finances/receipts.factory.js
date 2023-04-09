import faker from "faker";
import models from "@models";

const { Receipt } = models;

const createTestReceipt = async ({
  financeid, userid,
  month,
  offerings,
  tithes,
  seedfaith,
  thanksgiving,
  annualthanksgiving,
  buildingprojects,
  otherprojects,
  crusadeandmissionary,
  ministrydeposits,
  assetdisposal,
  interestincome,
  loanrepayedbydebtors,
  loanreceived,
  donationreceived,
  uploads, notes
}) => {
  const newReceipt = await Receipt.create({
    userid: userid || faker.datatype.number(),
    financeid: financeid || faker.datatype.number(),
    month: month || faker.datatype.datetime(),
    offerings: offerings || faker.datatype.number(),
    tithes: tithes || faker.datatype.number(),
    seedfaith: seedfaith || faker.datatype.number(),
    thanksgiving: thanksgiving || faker.datatype.number(),
    annualthanksgiving: annualthanksgiving || faker.datatype.number(),
    buildingprojects: buildingprojects || faker.datatype.number(),
    otherprojects: otherprojects || faker.datatype.number(),
    crusadeandmissionary: crusadeandmissionary || faker.datatype.number(),
    ministrydeposits: ministrydeposits || faker.datatype.number(),
    assetdisposal: assetdisposal || faker.datatype.number(),
    interestincome: interestincome || faker.datatype.number(),
    loanrepayedbydebtors: loanrepayedbydebtors || faker.datatype.number(),
    loanreceived: loanreceived || faker.datatype.number(),
    donationreceived: donationreceived || faker.datatype.number(),
    uploads: uploads || [JSON.parse(faker.datatype.json())],
    notes: notes || faker.random.alphaNumeric(10),
  });

  return (newReceipt);
};

export default createTestReceipt;
