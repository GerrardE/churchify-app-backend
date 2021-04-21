import faker from "faker";
import models from "@models";

const { Preacher } = models;

const createTestPreacher = async ({
  userid, branchid, firstname, lastname, address, city, state, country, notes, phone, email
}) => {
  const newPreacher = await Preacher.create({
    userid: userid || faker.datatype.uuid(),
    branchid: branchid || 1,
    firstname: firstname || faker.random.alphaNumeric(6),
    lastname: lastname || faker.random.alphaNumeric(6),
    address: address || faker.random.alphaNumeric(6),
    email: email || faker.internet.email(),
    phone: phone || faker.datatype.number(),
    city: city || 1,
    state: state || 1,
    country: country || 1,
    notes: notes || faker.random.alphaNumeric(6)
  });

  return (newPreacher);
};

export default createTestPreacher;
