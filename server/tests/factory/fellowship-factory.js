import faker from 'faker';
import models from '@models';

const { Fellowship } = models;

const createTestFellowship = async ({
  userId, branchId, name, address, city, state, country, description
}) => {
  const newFellowship = await Fellowship.create({
    userId: userId || faker.random.uuid(),
    branchId: branchId || faker.random.number(),
    name: name || faker.random.alphaNumeric(6),
    address: address || faker.random.alphaNumeric(6),
    city: city || faker.random.alphaNumeric(6),
    state: state || faker.random.alphaNumeric(6),
    country: country || faker.random.alphaNumeric(6),
    description: description || faker.random.alphaNumeric(6)
  });

  return (newFellowship);
};

export default createTestFellowship;
