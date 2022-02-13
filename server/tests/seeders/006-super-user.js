import bcrypt from "bcryptjs";
import faker from "faker";
import { config } from "dotenv";

config();

const salt = process.env.SALT || 10;
const SALT_ROUNDS = +salt;

const password = bcrypt.hashSync(process.env.SUPER_ADMIN_PASSWORD, SALT_ROUNDS);

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert("Users", [{
    id: faker.datatype.uuid(),
    firstname: "Test",
    lastname: "Tester",
    phone: "08021234567",
    email: "tester@trem.org",
    zoneid: 1,
    branchid: 1,
    city: 1,
    state: 1,
    country: 1,
    password,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete("Users", null, {})
};
