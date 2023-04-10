import faker from "faker";
import models from "@models";

const { Freport } = models;

const createTestFreport = async ({
  userid, newcells, totalcells, attendance, fellowshipid, branchid, zoneid, date, notes
}) => {
  const newFreport = await Freport.create({
    userid: userid || faker.datatype.number(),
    newcells: newcells || faker.datatype.number(),
    totalcells: totalcells || faker.datatype.number(),
    attendance: attendance || faker.datatype.number(),
    fellowshipid: fellowshipid || faker.datatype.number(),
    date: date || faker.date.recent(),
    zoneid: zoneid || faker.datatype.number(),
    branchid: branchid || faker.datatype.number(),
    notes: notes || faker.random.alphaNumeric(10),
  });

  return (newFreport);
};

export default createTestFreport;
