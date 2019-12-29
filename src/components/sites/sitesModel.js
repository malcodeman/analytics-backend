import { STRING } from "sequelize";

import sequelize from "../../connection";

const Site = sequelize.define("site", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  siteId: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

export default Site;
