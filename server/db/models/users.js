const { sequelize, DataTypes } = require("sequelize"); // Import the built-in data types
const sequelize = new Sequelize('postgres::memory:');
const bcrypt = require('bcrypt');

const users = sequelize.define('users', {
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
}, {
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
});