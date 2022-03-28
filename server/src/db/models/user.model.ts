import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../sequelize";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: number;
  declare email: string;
  declare password_digest: string;
}

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
    sequelize,
    tableName: "users",
    hooks: {
      beforeCreate: async (users) => {
        // if (users.password) {
        //   const salt = await bcrypt.genSaltSync(10);
        //   users.password = bcrypt.hashSync(users.password, salt);
        // }
      },
      beforeUpdate: async (users) => {
        // if (users.password) {
        //   const salt = await bcrypt.genSaltSync(10);
        //   users.password = bcrypt.hashSync(users.password, salt);
        // }
      },
    },
  }
);

export default User;
