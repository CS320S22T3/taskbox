import { DataTypes, Model } from "sequelize"; // Import the built-in data types
import bcrypt from "bcryptjs";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      validate: { isNull: false },
    },
    email: {
      type: DataTypes.CITEXT,
      unique: true,
      validate: { isNull: false, isEmail: true },
    },
    password_digest: {
      type: DataTypes.STRING,
      unique: false,
      validate: { isNull: false, len: [0, 60] },
    },
  },
  {
    hooks: {
      beforeCreate: async (users) => {
        if (users.password) {
          const salt = await bcrypt.genSaltSync(10);
          users.password = bcrypt.hashSync(users.password, salt);
        }
      },
      beforeUpdate: async (users) => {
        if (users.password) {
          const salt = await bcrypt.genSaltSync(10);
          users.password = bcrypt.hashSync(users.password, salt);
        }
      },
    },
    sequelize,
  }
);

export default User;
