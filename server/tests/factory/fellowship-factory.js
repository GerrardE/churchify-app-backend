import faker from 'faker';
import models from '@models';

const { Fellowship } = models;

const createTestFellowship = async ({
  userid, branchid, name, address, city, state, country, notes
}) => {
  const newFellowship = await Fellowship.create({
    userid: userid || faker.random.uuid(),
    branchid: branchid || faker.random.number(),
    name: name || faker.random.alphaNumeric(6),
    address: address || faker.random.alphaNumeric(6),
    city: city || faker.random.alphaNumeric(6),
    state: state || faker.random.alphaNumeric(6),
    country: country || faker.random.alphaNumeric(6),
    notes: notes || faker.random.alphaNumeric(6)
  });

  return (newFellowship);
};

export default createTestFellowship;
