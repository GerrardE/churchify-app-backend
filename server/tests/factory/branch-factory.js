import faker from "faker";
import models from "@models";

const { Branch } = models;

const createTestBranch = async ({
  zoneid, name, address, city, state, country, notes
}) => {
  const newBranch = await Branch.create({
    zoneid: zoneid || 1,
    name: name || faker.random.alphaNumeric(6),
    address: address || faker.random.alphaNumeric(6),
    city: city || 2,
    state: state || 2,
    country: country || 2,
    notes: notes || faker.random.alphaNumeric(6)
  });

  return (newBranch);
};

export default createTestBranch;
