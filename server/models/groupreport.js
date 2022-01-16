module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define("Group", {
    userid: {
      type: DataTypes.UUID,
      allowNull: false
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false
    },

    zoneid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    branchid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    cmf: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    cwf: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    gymcf: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    ywcf: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    yaf: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    teens: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    rcf: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    notes: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Group.associate = (models) => {
    const { Branch, User } = models;

    Group.belongsTo(User, {
      foreignKey: "id",
      as: "user_group"
    });

    Group.belongsTo(Branch, {
      foreignKey: "id",
      as: "groups"
    });
  };

  return Group;
};
