module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert("PermissionRoles", [
    {
      roleid: 1,
      permissionid: 101,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      roleid: 1,
      permissionid: 102,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      roleid: 1,
      permissionid: 103,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      roleid: 1,
      permissionid: 104,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      roleid: 1,
      permissionid: 105,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      roleid: 1,
      permissionid: 106,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      roleid: 1,
      permissionid: 107,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      roleid: 1,
      permissionid: 108,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      roleid: 1,
      permissionid: 109,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      roleid: 1,
      permissionid: 110,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      roleid: 1,
      permissionid: 111,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      roleid: 1,
      permissionid: 112,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete("PermissionRoles", null, {})
};
