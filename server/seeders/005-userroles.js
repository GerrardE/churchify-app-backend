module.exports = {
  up: async (queryInterface) => {
    const superadmin = await queryInterface.rawSelect("Users", {
      where: {
        email: "admin@projectchurchify.com",
      },
    }, ["id"]);

    if (superadmin) {
      queryInterface.bulkInsert("UserRoles", [{
        userid: superadmin,
        roleid: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    }
  },

  down: (queryInterface) => queryInterface.bulkDelete("UserRoles", null, {})
};
