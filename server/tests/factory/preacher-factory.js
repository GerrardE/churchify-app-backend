import faker from 'faker';
import models from '@models';

const { Preacher } = models;

const createTestPreacher = async ({
  userId, branchId, firstname, lastname, address, city, state, country, description
}) => {
  const newPreacher = await Preacher.create({
    userId: userId || faker.random.uuid(),
    branchId: branchId || faker.random.number(),
    firstname: firstname || faker.random.alphaNumeric(6),
    lastname: lastname || faker.random.alphaNumeric(6),
    address: address || faker.random.alphaNumeric(6),
    city: city || faker.random.alphaNumeric(6),
    state: state || faker.random.alphaNumeric(6),
    country: country || faker.random.alphaNumeric(6),
    description: description || faker.random.alphaNumeric(6)
  });

  return (newPreacher);
};

export default createTestPreacher;
