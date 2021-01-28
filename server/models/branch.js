module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define('Branch', {
    zoneid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    country: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    city: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false
    },

    state: {
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
      allowNull: false
    },
  }, {});

  Branch.associate = (models) => {
    const {
      User, Zone, Fellowship, Activity, Attendance, Membership, Training
    } = models;

    Branch.hasMany(User, {
      foreignKey: 'id',
      as: 'members'
    });

    Branch.hasMany(Fellowship, {
      foreignKey: 'id',
      as: 'fellowships'
    });

    Branch.hasMany(Activity, {
      foreignKey: 'id',
      as: 'activities'
    });

    Branch.hasMany(Membership, {
      foreignKey: 'id',
      as: 'membership'
    });

    Branch.hasMany(Training, {
      foreignKey: 'id',
      as: 'training'
    });

    Branch.hasMany(Attendance, {
      foreignKey: 'branchid',
      as: 'branchattendance'
    });

    Branch.belongsTo(Zone, {
      foreignKey: 'id',
      as: 'branches'
    });
  };

  return Branch;
};
