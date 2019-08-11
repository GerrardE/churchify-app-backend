module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    month: {
      type: DataTypes.STRING,
      allowNull: false
    },

    year: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});

  Event.associate = (models) => {
    const { Branch, User } = models;

    Event.belongsTo(User, {
      foreignKey: 'id',
      as: 'user_events'
    });

    Event.belongsTo(Branch, {
      foreignKey: 'id',
      as: 'branch_events'
    });
  };

  return Event;
};
