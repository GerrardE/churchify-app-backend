import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config();

const salt = process.env.SALT || 5;
const SALT_ROUNDS = +salt;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
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

      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },

      lastname: {
        type: DataTypes.STRING,
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

      branchid: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      country: {
        type: DataTypes.STRING,
        allowNull: false
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      hooks: {
        beforeCreate: user => User.hashPassword(user),
        beforeUpdate: user => User.hashPassword(user)
      }
    }
  );

  User.associate = (models) => {
    const {
      Branch,
      Fellowship,
      Download,
      Event,
      Freport,
      Group,
      Membership,
      Training
    } = models;

    User.hasMany(Training, {
      foreignKey: 'id',
      as: 'trainings'
    });

    User.hasMany(Membership, {
      foreignKey: 'id',
      as: 'memberships'
    });

    User.hasMany(Group, {
      foreignKey: 'id',
      as: 'groups'
    });

    User.hasMany(Freport, {
      foreignKey: 'id',
      as: 'freports'
    });

    User.hasMany(Event, {
      foreignKey: 'id',
      as: 'events'
    });

    User.hasMany(Download, {
      foreignKey: 'id',
      as: 'downloads'
    });

    User.belongsTo(Fellowship, {
      foreignKey: 'id',
      as: 'fellowship'
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
