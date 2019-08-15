import faker from 'faker';
import models from '@models';

const { Zone } = models;

const createTestZone = async ({
  userId, name, country, description
}) => {
  const newZone = await Zone.create({
    userId: userId || faker.random.uuid(),
    name: name || faker.random.alphaNumeric(6),
    country: country || faker.random.alphaNumeric(6),
    description: description || faker.random.alphaNumeric(6)
  });

  return (newZone);
};

export default createTestZone;
