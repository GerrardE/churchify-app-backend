import bcrypt from 'bcrypt';
import { config } from 'dotenv';

config();

const salt = process.env.SALT || 5;
// eslint-disable-next-line radix
const SALT_ROUNDS = parseInt(salt);

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },

    role: {
      type: DataTypes.STRING,
      allowNull: true // change to false
    },

    firstName: {
      type: DataTypes.CITEXT,
      allowNull: false
    },

    lastName: {
      type: DataTypes.CITEXT,
      allowNull: false
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    branch: {
      type: DataTypes.STRING,
      allowNull: false
    },

    country: {
      type: DataTypes.CITEXT,
      allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: user => User.hashPassword(user),
      beforeUpdate: user => User.hashPassword(user)
    }
  });

  User.associate = (models) => {
    const {
      Branch, Gtwelve, Download, Event, Greport, Group, Membership, Mit
    } = models;

    User.hasMany(Mit, {
      foreignKey: 'id',
      as: 'mits'
    });

    User.hasMany(Membership, {
      foreignKey: 'id',
      as: 'memberships'
    });

    User.hasMany(Group, {
      foreignKey: 'id',
      as: 'groups'
    });

    User.hasMany(Greport, {
      foreignKey: 'id',
      as: 'greports'
    });

    User.hasMany(Event, {
      foreignKey: 'id',
      as: 'events'
    });

    User.hasMany(Download, {
      foreignKey: 'id',
      as: 'downloads'
    });

    User.belongsTo(Gtwelve, {
      foreignKey: 'id',
      as: 'g12'
    });

    User.belongsTo(Branch, {
      foreignKey: 'id',
      as: 'member'
    });
  };

  User.hashPassword = async (user) => {
    const hash = await bcrypt.hash(user.dataValues.password, SALT_ROUNDS);
    await user.setDataValue('password', hash);
  };

  return User;
};
