import faker from "faker";
import models from "@models";
import { createToken } from "../../middlewares/Token";

const { User } = models;

const generateToken = async (userDetails) => {
  const token = await createToken(userDetails);
  return token;
};

const createTestUser = async ({
  firstname, lastname, phone, email, zoneid, branchid, city, state, country, password
}) => {
  const newUser = await User.create({
    id: faker.datatype.uuid(),
    firstname: firstname || faker.random.alphaNumeric(6),
    lastname: lastname || faker.random.alphaNumeric(6),
    phone: phone || faker.datatype.number(),
    email: email || faker.internet.email(),
    zoneid: zoneid || 1,
    branchid: branchid || 1,
    city: city || 1,
    state: state || 1,
    country: country || 1,
    password: password || faker.internet.password()
  });

  return (newUser);
};

export { createTestUser, generateToken };
