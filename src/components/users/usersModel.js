import { STRING, BOOLEAN } from "sequelize";

import sequelize from "../../connection";
import Site from "../sites/sitesModel";

const User = sequelize.define("user", {
  email: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  firstName: {
    type: STRING
  },
  lastName: {
    type: STRING
  },
  company: {
    type: STRING
  },
  isVerified: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notEmpty: true
    }
  }
});

User.hasMany(Site);

export default User;
