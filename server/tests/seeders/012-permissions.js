module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert("Permissions", [
    {
      name: "can:post:city",
      notes: "can post city",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:put:city",
      notes: "can put city",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:get:city",
      notes: "can get city",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:delete:city",
      notes: "can delete city",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:post:state",
      notes: "can post state",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:put:state",
      notes: "can put state",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:get:state",
      notes: "can get state",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:delete:state",
      notes: "can delete state",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:post:country",
      notes: "can post country",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:put:country",
      notes: "can put country",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:get:country",
      notes: "can get country",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:delete:country",
      notes: "can delete country",
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete("Permissions", null, {})
};
