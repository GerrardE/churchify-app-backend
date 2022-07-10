module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert("Configs", [
    {
      name: "categories",
      type: "setting",
      config: '{"{\"field\": \"userid\", \"datatype\": \"uuid\", \"required\": true}",}}}"}',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete("Configs", null, {})
};
