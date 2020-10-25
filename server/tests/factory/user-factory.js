import faker from 'faker';
import models from '@models';
import { createToken } from '../../middlewares/Token';

const { User } = models;

const generateToken = async (userDetails) => {
  const token = await createToken(userDetails);
  return token;
};

const createTestUser = async ({
  firstname, lastname, phone, email, branchid, country, password
}) => {
  const newUser = await User.create({
    id: faker.random.uuid(),
    firstname: firstname || faker.random.alphaNumeric(6),
    lastname: lastname || faker.random.alphaNumeric(6),
    phone: phone || faker.random.number(),
    email: email || faker.internet.email(),
    branchid: branchid || faker.random.number(),
    country: country || faker.address.country(),
    password: password || faker.internet.password()
  });

  return (newUser);
};

export { createTestUser, generateToken };
