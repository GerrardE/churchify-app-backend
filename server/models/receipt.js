module.exports = (sequelize, DataTypes) => {
  const Receipt = sequelize.define("Receipt", {
    userid: { // reporter
      type: DataTypes.UUID,
      allowNull: false,
    },
    financeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: { type: DataTypes.DATE, allowNull: false },
    offerings: { type: DataTypes.INTEGER, allowNull: false },
    tithes: { type: DataTypes.INTEGER, allowNull: false },
    seedfaith: { type: DataTypes.INTEGER, allowNull: false },
    thanksgiving: { type: DataTypes.INTEGER, allowNull: false },
    annualthanksgiving: { type: DataTypes.INTEGER, allowNull: false },
    buildingprojects: { type: DataTypes.INTEGER, allowNull: false },
    otherprojects: { type: DataTypes.INTEGER, allowNull: false },
    crusadeandmissionary: { type: DataTypes.INTEGER, allowNull: false },
    ministrydeposits: { type: DataTypes.INTEGER, allowNull: false },
    assetdisposal: { type: DataTypes.INTEGER, allowNull: false },
    interestincome: { type: DataTypes.INTEGER, allowNull: false },
    loanrepayedbydebtors: { type: DataTypes.INTEGER, allowNull: false },
    loanreceived: { type: DataTypes.INTEGER, allowNull: false },
    donationreceived: { type: DataTypes.INTEGER, allowNull: false },
    buffer: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
      get() {
        return this.getDataValue("buffer")
          .toString("base64");
      }
    },
    originalname: { type: DataTypes.STRING, allowNull: false },
    mimetype: { type: DataTypes.STRING, allowNull: false },
    notes: {
      type: DataTypes.STRING,
    }
  }, {});

  Receipt.associate = (models) => {
    const {
      Finance, User
    } = models;

    Receipt.belongsTo(Finance, {
      foreignKey: "id",
      as: "receipts"
    });

    Receipt.belongsTo(User, {
      foreignKey: "id",
      as: "user_receipts"
    });
  };

  return Receipt;
};
