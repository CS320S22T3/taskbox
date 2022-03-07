'use strict';
const { DataTypes } = require("sequelize"); // Import the built-in data types
const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      validate: { isNull: false }
    },
    email: {
      type: DataTypes.CITEXT,
      unique: true,
      validate: { isNull: false }
    },
    password_digest: {
      type: DataTypes.STRING,
      unique: true,
      validate: { isNull: false, len: [0, 60] }
    }
  },
    {
      hooks: {
        beforeCreate: async (users) => {
          if (users.password) {
            const salt = await bcrypt.genSaltSync(10, 'a');
            users.password = bcrypt.hashSync(users.password, salt);
          }
        },
        beforeUpdate: async (users) => {
          if (users.password) {
            const salt = await bcrypt.genSaltSync(10, 'a');
            users.password = bcrypt.hashSync(users.password, salt);
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'users',
    });
  return users;
};