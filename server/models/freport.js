module.exports = (sequelize, DataTypes) => {
  const Freport = sequelize.define('Freport', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    fellowshipId: {
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
