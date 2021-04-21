import faker from "faker";
import models from "@models";

const { Fellowship } = models;

const createTestFellowship = async ({
  userid, branchid, name, address, city, state, country, notes
}) => {
  const newFellowship = await Fellowship.create({
    userid: userid || faker.datatype.uuid(),
    branchid: branchid || faker.datatype.number(),
    name: name || faker.random.alphaNumeric(6),
    address: address || faker.random.alphaNumeric(6),
    city: city || faker.datatype.number(),
    state: state || faker.datatype.number(),
    country: country || faker.datatype.number(),
    notes: notes || faker.random.alphaNumeric(6)
  });

  return (newFellowship);
};

export default createTestFellowship;
