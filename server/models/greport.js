module.exports = (sequelize, DataTypes) => {
  const Greport = sequelize.define('Greport', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    gtwelveId: {
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

  Greport.associate = (models) => {
    const { Gtwelve, User } = models;

    Greport.belongsTo(User, {
      foreignKey: 'id',
      as: 'user_report'
    });

    Greport.belongsTo(Gtwelve, {
      foreignKey: 'id',
      as: 'reports'
    });
  };

  return Greport;
};
