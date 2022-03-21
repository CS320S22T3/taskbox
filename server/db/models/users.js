const { Sequelize, DataTypes, Model } = require("sequelize"); // Import the built-in data types
const sequelize = new Sequelize('postgres::memory:', {
  define: {
    freezeTableName: true
  }
});
const bcrypt = require('bcryptjs');

class users extends Model {
  /* EXAMPLES OF METHODS
  static classLevelMethod() {
    return 'foo';
  }
  instanceLevelMethod() {
    return 'bar';
  }
  getFullname() {
    return [this.firstname, this.lastname].join(' ');
  } 
  */
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
    unique: false,
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
  },
  sequelize
});

