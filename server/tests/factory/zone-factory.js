import faker from 'faker';
import models from '@models';

const { Zone } = models;

const createTestZone = async ({
  name, country, notes
}) => {
  const newZone = await Zone.create({
    name: name || faker.random.word(6),
    country: country || 1,
    notes: notes || faker.random.word(6)
  });

  return (newZone);
};

export default createTestZone;
