import faker from "faker";

module.exports = {
    up: (queryInterface) => queryInterface.bulkInsert("States", [{
        name: faker.random.alphaNumeric(6),
        country_id: 1,
        country_code: 2,
        fips_code: 2,
        iso2: "iso",
        flag: 20,
        wikiDataId: faker.random.alphaNumeric(6),
        createdAt: new Date(),
        updatedAt: new Date()
    }], {}),

    down: (queryInterface) => queryInterface.bulkDelete("States", null, {})
};
