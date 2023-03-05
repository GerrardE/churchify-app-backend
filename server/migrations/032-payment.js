module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("Payments", {
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
    nationalofficeremittance: {
      type: Sequelize.STRING,
      allowNull: false
    }, // 0.25remittancetonationaloffice
    // receiptnationalofficeremittance:
    // {
    //   type: Sequelize.INTEGER,
    //   allowNull: false
    // }, // nationalofficeremittance receipt(pdf)
    hqbuilding: { type: Sequelize.INTEGER, allowNull: false }, // .05 hq building
    zonalhqremittance: { type: Sequelize.INTEGER, allowNull: false }, // .05 zonal hq
    salariesallowances: { type: Sequelize.INTEGER, allowNull: false },
    pastorpension: { type: Sequelize.INTEGER, allowNull: false },
    crusadeandmissionary: { type: Sequelize.INTEGER, allowNull: false },
    personalwelfare: { type: Sequelize.INTEGER, allowNull: false },
    transport: { type: Sequelize.INTEGER, allowNull: false },
    accomodation: { type: Sequelize.INTEGER, allowNull: false },
    donations: { type: Sequelize.INTEGER, allowNull: false },
    entertainment: { type: Sequelize.INTEGER, allowNull: false },
    medicalwelfare: { type: Sequelize.INTEGER, allowNull: false },
    stationery: { type: Sequelize.INTEGER, allowNull: false },
    churchexpenses: { type: Sequelize.INTEGER, allowNull: false },
    officeexpenses: { type: Sequelize.INTEGER, allowNull: false },
    rentpersonage: { type: Sequelize.INTEGER, allowNull: false },
    churchrent: { type: Sequelize.INTEGER, allowNull: false },
    telephoneandinternet: { type: Sequelize.INTEGER, allowNull: false },
    electricity: { type: Sequelize.INTEGER, allowNull: false },
    fuels: { type: Sequelize.INTEGER, allowNull: false },
    subscriptions: { type: Sequelize.INTEGER, allowNull: false },
    security: { type: Sequelize.INTEGER, allowNull: false },
    bankcharges: { type: Sequelize.INTEGER, allowNull: false },
    groupexpenses: { type: Sequelize.INTEGER, allowNull: false },
    loanadvanced: { type: Sequelize.INTEGER, allowNull: false },
    loanrepaid: { type: Sequelize.INTEGER, allowNull: false },
    furnituremaintenance: { type: Sequelize.INTEGER, allowNull: false },
    eqptmaintenance: { type: Sequelize.INTEGER, allowNull: false },
    motormaintenance: { type: Sequelize.INTEGER, allowNull: false },
    churchbldmaintenance: { type: Sequelize.INTEGER, allowNull: false },
    parsonagemaintenance: { type: Sequelize.INTEGER, allowNull: false },
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

  down: (queryInterface) => queryInterface.dropTable("Payments"),
};
