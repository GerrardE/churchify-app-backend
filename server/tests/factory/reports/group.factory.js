import faker from "faker";
import models from "@models";

const { Group } = models;

const createTestGroup = async ({
  userid, cmf, cwf, cyf, rcf, branchid, notes, zoneid, date, teens, yaf, ywcf, gymcf
}) => {
  const newGroup = await Group.create({
    userid: userid || faker.datatype.number(),
    cmf: cmf || faker.datatype.number(),
    cwf: cwf || faker.datatype.number(),
    cyf: cyf || faker.datatype.number(),
    rcf: rcf || faker.datatype.number(),
    zoneid: zoneid || faker.datatype.number(),
    branchid: branchid || faker.datatype.number(),
    notes: notes || faker.random.alphaNumeric(10),
    gymcf: gymcf || faker.datatype.number(),
    ywcf: ywcf || faker.datatype.number(),
    yaf: yaf || faker.datatype.number(),
    teens: teens || faker.datatype.number(),
    date: date || faker.date.recent(),
  });

  return (newGroup);
};

export default createTestGroup;
