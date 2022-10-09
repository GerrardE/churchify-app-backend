import faker from "faker";

module.exports = {
    up: (queryInterface) => queryInterface.bulkInsert("Cities", [{
        name: faker.random.alphaNumeric(6),
        state_id: 1,
        country_id: 1,
        country_code: 2,
        latitude: 20.1,
        longitude: 20.1,
        flag: 20,
        wikiDataId: faker.random.alphaNumeric(6),
        createdAt: new Date(),
        updatedAt: new Date(),
    }], {}),

    down: (queryInterface) => queryInterface.bulkDelete("Cities", null, {})
};
