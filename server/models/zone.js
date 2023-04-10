module.exports = (sequelize, DataTypes) => {
  const Zone = sequelize.define("Zone", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    country: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    notes: {
      type: DataTypes.STRING,
    }
  }, {});

  Zone.associate = (models) => {
    const {
      Branch, Attendance
    } = models;

    Zone.hasMany(Branch, {
      foreignKey: "zoneid",
      as: "branches"
    });

    Zone.hasMany(Attendance, {
      foreignKey: "zoneid",
      as: "zoneattendance"
    });
  };

  return Zone;
};
