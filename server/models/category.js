module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    downloadId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});

  Category.associate = (models) => {
    const { User, Download } = models;

    Category.belongsTo(User, {
      foreignKey: 'id',
      as: 'category'
    });

    Category.hasMany(Download, {
      foreignKey: 'id',
      as: 'download'
    });
  };

  return Category;
};
