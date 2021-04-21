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
    firstname: "Gerrard",
    lastname: "Ezeugwa",
    phone: "08137519688",
    email: "admin@projectchurchify.com",
    zoneid: 1,
    branchid: 1,
    city: 77002,
    state: 306,
    country: 161,
    password,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete("Users", null, {})
};
