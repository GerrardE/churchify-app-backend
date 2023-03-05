module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("Payment", {
    userid: { // reporter
      type: DataTypes.UUID,
      allowNull: false,
    },
    financeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nationalofficeremittance: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hqbuilding: { type: DataTypes.INTEGER, allowNull: false }, // .05 hq building
    zonalhqremittance: { type: DataTypes.INTEGER, allowNull: false }, // .05 zonal hq
    salariesallowances: { type: DataTypes.INTEGER, allowNull: false },
    pastorpension: { type: DataTypes.INTEGER, allowNull: false },
    crusadeandmissionary: { type: DataTypes.INTEGER, allowNull: false },
    personalwelfare: { type: DataTypes.INTEGER, allowNull: false },
    transport: { type: DataTypes.INTEGER, allowNull: false },
    accomodation: { type: DataTypes.INTEGER, allowNull: false },
    donations: { type: DataTypes.INTEGER, allowNull: false },
    entertainment: { type: DataTypes.INTEGER, allowNull: false },
    medicalwelfare: { type: DataTypes.INTEGER, allowNull: false },
    stationery: { type: DataTypes.INTEGER, allowNull: false },
    churchexpenses: { type: DataTypes.INTEGER, allowNull: false },
    officeexpenses: { type: DataTypes.INTEGER, allowNull: false },
    rentpersonage: { type: DataTypes.INTEGER, allowNull: false },
    churchrent: { type: DataTypes.INTEGER, allowNull: false },
    telephoneandinternet: { type: DataTypes.INTEGER, allowNull: false },
    electricity: { type: DataTypes.INTEGER, allowNull: false },
    fuels: { type: DataTypes.INTEGER, allowNull: false },
    subscriptions: { type: DataTypes.INTEGER, allowNull: false },
    security: { type: DataTypes.INTEGER, allowNull: false },
    bankcharges: { type: DataTypes.INTEGER, allowNull: false },
    groupexpenses: { type: DataTypes.INTEGER, allowNull: false },
    loanadvanced: { type: DataTypes.INTEGER, allowNull: false },
    loanrepaid: { type: DataTypes.INTEGER, allowNull: false },
    furnituremaintenance: { type: DataTypes.INTEGER, allowNull: false },
    eqptmaintenance: { type: DataTypes.INTEGER, allowNull: false },
    motormaintenance: { type: DataTypes.INTEGER, allowNull: false },
    churchbldmaintenance: { type: DataTypes.INTEGER, allowNull: false },
    parsonagemaintenance: { type: DataTypes.INTEGER, allowNull: false },
    uploads: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Payment.associate = (models) => {
    const {
      Finance, User
    } = models;

    Payment.belongsTo(Finance, {
      foreignKey: "id",
      as: "payments"
    });

    Payment.belongsTo(User, {
      foreignKey: "id",
      as: "user_payments"
    });
  };

  return Payment;
};
