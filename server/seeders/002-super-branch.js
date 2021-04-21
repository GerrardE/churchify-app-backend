module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert("Branches", [{
    name: "Headquarters",
    country: 161,
    state: 306,
    address: "Anthony Oke Expressway",
    city: 6,
    zoneid: 1,
    notes: "TREM International Headquarters Branch",
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete("Branches", null, {})
};
