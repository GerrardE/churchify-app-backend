module.exports = (sequelize, DataTypes) => {
  const Freport = sequelize.define('Freport', {
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

    fellowshipid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    newcells: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    totalcells: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    attendance: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    notes: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Freport.associate = (models) => {
    const { Fellowship, User } = models;

    Freport.belongsTo(User, {
      foreignKey: 'id',
      as: 'user_report'
    });

    Freport.belongsTo(Fellowship, {
      foreignKey: 'id',
      as: 'reports'
    });
  };

  return Freport;
};
