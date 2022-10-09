import faker from "faker";

module.exports = {
    up: (queryInterface) => queryInterface.bulkInsert("Countries", [{
        name: faker.random.alphaNumeric(6),
        iso2: "iso",
        iso3: "iso",
        phonecode: "+234",
        capital: faker.random.alphaNumeric(6),
        currency: faker.random.alphaNumeric(6),
        native: faker.random.alphaNumeric(6),
        region: faker.random.alphaNumeric(6),
        subregion: faker.random.alphaNumeric(6),
        emoji: faker.random.alphaNumeric(6),
        emojiU: faker.random.alphaNumeric(6),
        flag: 20,
        wikiDataId: faker.random.alphaNumeric(6),
        createdAt: new Date(),
        updatedAt: new Date()
    }], {}),

    down: (queryInterface) => queryInterface.bulkDelete("Countries", null, {})
};
