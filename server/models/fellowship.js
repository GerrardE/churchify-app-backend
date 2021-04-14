module.exports = (sequelize, DataTypes) => {
  const Fellowship = sequelize.define("Fellowship", {
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

    address: {
      type: DataTypes.STRING,
      allowNull: false
    },

    city: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    state: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    country: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    notes: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});

  Fellowship.associate = (models) => {
    const { Branch, User } = models;

    Fellowship.belongsTo(Branch, {
      foreignKey: "id",
      as: "fellowships"
    });

    Fellowship.belongsTo(User, {
      foreignKey: "id",
      as: "user_fellowship"
    });
  };

  return Fellowship;
};
