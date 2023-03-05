import faker from "faker";
import models from "@models";

const { Finance } = models;

const createTestFinance = async ({
  name, zoneid, branchid, preacherid, userid, notes
}) => {
  const newFinance = await Finance.create({
    name: name || faker.random.word(),
    zoneid: zoneid || faker.datatype.number(),
    branchid: branchid || faker.datatype.number(),
    preacherid: preacherid || faker.datatype.number(),
    userid: userid || faker.datatype.number(),
    notes: notes || faker.random.alphaNumeric(10),
  });

  return (newFinance);
};

export default createTestFinance;
