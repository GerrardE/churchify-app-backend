import faker from 'faker';
import models from '@models';

const { Branch } = models;

const createTestBranch = async ({
  userId, zoneId, name, address, city, state, country, description
}) => {
  const newBranch = await Branch.create({
    userId: userId || faker.random.uuid(),
    zoneId: zoneId || faker.random.number(),
    name: name || faker.random.alphaNumeric(6),
    address: address || faker.random.alphaNumeric(6),
    city: city || faker.random.alphaNumeric(6),
    state: state || faker.random.alphaNumeric(6),
    country: country || faker.random.alphaNumeric(6),
    description: description || faker.random.alphaNumeric(6)
  });

  return (newBranch);
};

export default createTestBranch;
