module.exports = {
  up: async (queryInterface) => {
    const superadmin = await queryInterface.rawSelect("Users", {
      where: {
        email: "tester@trem.org",
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
