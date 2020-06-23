import mongoose from "mongoose";

import User from "../src/components/users/usersModel";
import logger from "../src/util/logger";
import constants from "../src/constants";

async function drop() {
  try {
    await mongoose.connect(constants.MONGODB_URI, {
      useNewUrlParser: true,
    });

    const count = await User.countDocuments({});

    await mongoose.connection.db.dropDatabase();

    logger.log(`Dropped database\nRemoved ${count} users`);

    process.exit();
  } catch (error) {
    logger.log(error, logger.LEVELS.ERROR);

    process.exit(1);
  }
}

drop();
