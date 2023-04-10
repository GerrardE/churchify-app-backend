module.exports = {
  up: async (queryInterface) => {
    const superadmin = await queryInterface.rawSelect("Users", {
      where: {
        email: "admin@projectchurchify.com",
      },
    }, ["id"]);

    if (superadmin) {
      queryInterface.bulkInsert("Preachers", [
        {
          userid: superadmin,
          firstname: "Mike",
          lastname: "Okonkwo",
          address: "Lagos",
          email: "mike.okonkwo@trem.org",
          phone: "08100000000",
          branchid: 1,
          country: 161,
          state: 32,
          city: 6,
          notes: "The Presiding Bishop Of Trem",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userid: superadmin,
          firstname: "Peace",
          lastname: "Okonkwo",
          email: "peace.okonkwo@trem.org",
          phone: "08100000000",
          address: "Lagos",
          country: 161,
          state: 32,
          city: 6,
          branchid: 1,
          notes: "The Resident Pastor Of Trem HQ",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    }
  },

  down: (queryInterface) => queryInterface.bulkDelete("Preachers", null, {})
};
