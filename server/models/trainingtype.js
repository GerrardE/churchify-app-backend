module.exports = (sequelize, DataTypes) => {
  const TrainingType = sequelize.define("TrainingType", {
    userid: {
      type: DataTypes.UUID,
      allowNull: false
    },

    branchid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },

    notes: {
      type: DataTypes.STRING,
    },
  }, {});

  TrainingType.associate = (models) => {
    const { Branch } = models;

    TrainingType.belongsTo(Branch, {
      foreignKey: "id",
      as: "trainingtype"
    });
  };

  return TrainingType;
};
