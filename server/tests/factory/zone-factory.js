import faker from 'faker';
import models from '@models';

const { Zone } = models;

const createTestZone = async ({
  userid, name, country, notes
}) => {
  const newZone = await Zone.create({
    userid: userid || faker.random.uuid(),
    name: name || faker.random.word(6),
    country: country || faker.random.number(),
    notes: notes || faker.random.word(6)
  });

  return (newZone);
};

export default createTestZone;
