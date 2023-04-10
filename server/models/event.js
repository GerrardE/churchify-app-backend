module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
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

    date: {
      type: DataTypes.DATE,
      allowNull: false
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false
    },

    notes: {
      type: DataTypes.STRING,
    },
  }, {});

  Event.associate = (models) => {
    const { Branch, User } = models;

    Event.belongsTo(User, {
      foreignKey: "id",
      as: "user_events"
    });

    Event.belongsTo(Branch, {
      foreignKey: "id",
      as: "branch_events"
    });
  };

  return Event;
};
