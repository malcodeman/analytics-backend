import Sequelize from "sequelize";

import { DB } from "./constants";

const sequelize = new Sequelize(DB.NAME, DB.USER, DB.PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize.sync({ force: true });

async function authenticate() {
  await sequelize.authenticate();
}

try {
  authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default sequelize;
