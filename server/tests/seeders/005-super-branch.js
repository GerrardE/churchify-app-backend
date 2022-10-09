module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert("Branches", [{
    name: "Headquarters",
    country: 1,
    state: 1,
    address: "Anthony Oke Expressway",
    city: 1,
    zoneid: 1,
    notes: "TREM International Headquarters Branch",
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete("Branches", null, {})
};
  