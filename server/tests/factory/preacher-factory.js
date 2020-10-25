import faker from 'faker';
import models from '@models';

const { Preacher } = models;

const createTestPreacher = async ({
  userid, branchid, firstname, lastname, address, city, state, country, notes
}) => {
  const newPreacher = await Preacher.create({
    userid: userid || faker.random.uuid(),
    branchid: branchid || faker.random.number(),
    firstname: firstname || faker.random.alphaNumeric(6),
    lastname: lastname || faker.random.alphaNumeric(6),
    address: address || faker.random.alphaNumeric(6),
    city: city || faker.random.alphaNumeric(6),
    state: state || faker.random.alphaNumeric(6),
    country: country || faker.random.alphaNumeric(6),
    notes: notes || faker.random.alphaNumeric(6)
  });

  return (newPreacher);
};

export default createTestPreacher;
