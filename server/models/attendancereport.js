module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    userid: {
      type: DataTypes.UUID,
      allowNull: false
    },

    day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    month: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    year: {
      type: DataTypes.INTEGER,
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

    eventid: {
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

    preacherid: {
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
      User, Branch, Event, Zone
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

    Attendance.belongsTo(Zone, {
      foreignKey: 'id',
      as: 'zoneattendance'
    });
  };

  return Attendance;
};
