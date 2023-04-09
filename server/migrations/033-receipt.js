module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("Receipts", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    userid: { // reporter
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
    },
    financeid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Finances",
        key: "id"
      }
    },
    month: { type: Sequelize.DATE, allowNull: false },
    offerings: { type: Sequelize.INTEGER, allowNull: false },
    tithes: { type: Sequelize.INTEGER, allowNull: false },
    seedfaith: { type: Sequelize.INTEGER, allowNull: false },
    thanksgiving: { type: Sequelize.INTEGER, allowNull: false },
    annualthanksgiving: { type: Sequelize.INTEGER, allowNull: false },
    buildingprojects: { type: Sequelize.INTEGER, allowNull: false },
    otherprojects: { type: Sequelize.INTEGER, allowNull: false },
    crusadeandmissionary: { type: Sequelize.INTEGER, allowNull: false },
    ministrydeposits: { type: Sequelize.INTEGER, allowNull: false },
    assetdisposal: { type: Sequelize.INTEGER, allowNull: false },
    interestincome: { type: Sequelize.INTEGER, allowNull: false },
    loanrepayedbydebtors: { type: Sequelize.INTEGER, allowNull: false },
    loanreceived: { type: Sequelize.INTEGER, allowNull: false },
    donationreceived: { type: Sequelize.INTEGER, allowNull: false },
    uploads: {
      type: Sequelize.ARRAY(Sequelize.JSONB),
      allowNull: false
    },
    notes: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable("Receipts"),
};
