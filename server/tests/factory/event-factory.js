import faker from 'faker';
import models from '@models';

const { Event } = models;

const createTestEvent = async ({
  userid, branchid, name, month, year, notes
}) => {
  const newEvent = await Event.create({
    userid: userid || faker.random.uuid(),
    branchid: branchid || faker.random.number(),
    name: name || faker.random.alphaNumeric(6),
    month: month || faker.random.word(),
    year: year || faker.random.number(4),
    notes: notes || faker.random.alphaNumeric(6)
  });

  return (newEvent);
};

export default createTestEvent;
