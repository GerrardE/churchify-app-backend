import faker from "faker";
import models from "@models";

const { Membership } = models;

const createTestMembership = async ({
  userid, adults, children, newmembers, branchid, zoneid, tithers, date, notes
}) => {
  const newMembership = await Membership.create({
    userid: userid || faker.datatype.number(),
    adults: adults || faker.datatype.number(),
    children: children || faker.datatype.number(),
    tithers: tithers || faker.datatype.number(),
    newmembers: newmembers || faker.datatype.number(),
    branchid: branchid || faker.datatype.number(),
    zoneid: zoneid || faker.datatype.number(),
    date: date || faker.date.recent(),
    notes: notes || faker.random.alphaNumeric(10),
  });

  return (newMembership);
};

export default createTestMembership;
