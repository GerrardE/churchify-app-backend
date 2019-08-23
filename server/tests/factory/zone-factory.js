import faker from 'faker';
import models from '@models';

const { Zone } = models;

const createTestZone = async ({
  userId, name, country, description
}) => {
  const newZone = await Zone.create({
    userId: userId || faker.random.uuid(),
    name: name || faker.random.word(6),
    country: country || faker.random.word(6),
    description: description || faker.random.word(6)
  });

  return (newZone);
};

export default createTestZone;
