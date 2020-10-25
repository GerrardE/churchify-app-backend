module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    userid: {
      type: DataTypes.UUID,
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
