import faker from 'faker';
import models from '@models';
import { createToken } from '../../middlewares/Token';

const { User } = models;

const generateToken = async (userDetails) => {
  const token = await createToken(userDetails);
  return token;
};

const createTestUser = async ({
  firstName, lastName, phone, email, branchId, country, password
}) => {
  const newUser = await User.create({
    id: faker.random.uuid(),
    firstName: firstName || faker.random.alphaNumeric(6),
    lastName: lastName || faker.random.alphaNumeric(6),
    phone: phone || faker.random.number(),
    email: email || faker.internet.email(),
    branchId: branchId || faker.random.number(),
    country: country || faker.address.country(),
    password: password || faker.internet.password()
  });

  return (newUser);
};

export { createTestUser, generateToken };
