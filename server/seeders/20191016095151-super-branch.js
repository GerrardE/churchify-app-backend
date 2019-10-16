
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Branches', [{
    name: 'Headquarters',
    country: 'Nigeria',
    state: 'Lagos',
    address: 'Anthony Oke Expressway',
    city: 'Gbagada',
    zoneId: '1',
    description: 'TREM International Headquarters',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Branches', null, {})
};
