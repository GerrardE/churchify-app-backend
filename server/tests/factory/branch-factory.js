import faker from 'faker';
import models from '@models';

const { Branch } = models;

const createTestBranch = async ({
  userid, zoneid, name, address, city, state, country, notes
}) => {
  const newBranch = await Branch.create({
    userid: userid || faker.random.uuid(),
    zoneid: zoneid || faker.random.number(),
    name: name || faker.random.alphaNumeric(6),
    address: address || faker.random.alphaNumeric(6),
    city: city || faker.random.alphaNumeric(6),
    state: state || faker.random.alphaNumeric(6),
    country: country || faker.random.alphaNumeric(6),
    notes: notes || faker.random.alphaNumeric(6)
  });

  return (newBranch);
};

export default createTestBranch;
