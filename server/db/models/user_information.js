const { Sequelize, DataTypes, Model } = require("sequelize"); // Import the built-in data types
const sequelize = new Sequelize('postgres::memory:', {
  define: {
    freezeTableName: true
  }
});
class user_informations extends Model {
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

user_informations.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    validate: { isNull: false }
  },
  user_id: {
    type: DataTypes.INTEGER,
    unique: true,
    validate: { isNull: false }
  },
  first_name: {
    type: DataTypes.TEXT,
    unique: false,
    validate: { isNull: false }
  },
  last_name: {
    type: DataTypes.TEXT,
    unique: false,
    validate: { isNull: false }
  },
  position: {
    type: DataTypes.TEXT,
    unique: false,
    validate: { isNull: false }
  },
  date_hired: {
    type: DataTypes.DATE,
    unique: false,
    validate: { isNull: false }
  },
  is_manager: {
    type: DataTypes.BOOLEAN,
    unique: false,
    validate: { isNull: false }
  }
}, { sequelize });

