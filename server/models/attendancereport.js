module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define("Attendance", {
    userid: {
      type: DataTypes.UUID,
      allowNull: false
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return this.getDataValue("date")
          .toLocaleDateString("en-GB", { timeZone: "UTC" });
      }
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
    },

    createdAt: {
      type: DataTypes.DATE,
      get() {
        return this.getDataValue("createdAt")
          .toLocaleString("en-GB", { timeZone: "UTC" });
      }
    },

    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return this.getDataValue("updatedAt")
          .toLocaleString("en-GB", { timeZone: "UTC" });
      }
    }
  }, {});

  Attendance.associate = (models) => {
    const {
      User, Branch, Event, Zone
    } = models;

    Attendance.belongsTo(User, {
      foreignKey: "userid",
      as: "attendance"
    });

    Attendance.hasMany(Event, {
      foreignKey: "id",
      as: "events"
    });

    Attendance.belongsTo(Branch, {
      foreignKey: "branchid",
      as: "branchattendance"
    });

    Attendance.belongsTo(Zone, {
      foreignKey: "zoneid",
      as: "zoneattendance"
    });
  };

  return Attendance;
};
