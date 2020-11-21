import faker from 'faker';
import models from '@models';

const { Event } = models;

const createTestEvent = async ({
  userid, branchid, name, date, address, notes
}) => {
  const newEvent = await Event.create({
    userid: userid || faker.random.uuid(),
    branchid: branchid || faker.random.number(),
    name: name || faker.random.alphaNumeric(6),
    address: address || faker.random.alphaNumeric(6),
    date: date || Date.now(),
    notes: notes || faker.random.alphaNumeric(6)
  });

  return (newEvent);
};

export default createTestEvent;
