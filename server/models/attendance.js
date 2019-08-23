module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    women: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    men: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    children: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    preacherId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    notes: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});

  Attendance.associate = (models) => {
    const {
      User, Branch, Event
    } = models;

    Attendance.belongsTo(User, {
      foreignKey: 'id',
      as: 'activity'
    });

    Attendance.hasMany(Event, {
      foreignKey: 'id',
      as: 'events'
    });

    Attendance.belongsTo(Branch, {
      foreignKey: 'id',
      as: 'attendance'
    });
  };

  return Attendance;
};
