import faker from 'faker';
import models from '@models';

const { Event } = models;

const createTestEvent = async ({
  userId, branchId, name, month, year, description
}) => {
  const newEvent = await Event.create({
    userId: userId || faker.random.uuid(),
    branchId: branchId || faker.random.number(),
    name: name || faker.random.alphaNumeric(6),
    month: month || faker.random.word(),
    year: year || faker.random.number(4),
    description: description || faker.random.alphaNumeric(6)
  });

  return (newEvent);
};

export default createTestEvent;
