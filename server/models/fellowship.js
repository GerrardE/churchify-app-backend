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
    },
  }, {});

  Fellowship.associate = (models) => {
    const { Branch, User, Freport } = models;

    Fellowship.belongsTo(Branch, {
      foreignKey: "branchid",
      as: "branchfellowship"
    });

    Fellowship.belongsTo(User, {
      foreignKey: "id",
      as: "userfellowship"
    });

    Fellowship.hasMany(Freport, {
      foreignKey: "id",
      as: "freports"
    });
  };

  return Fellowship;
};
