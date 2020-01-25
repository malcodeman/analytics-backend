import mongoose from "mongoose";

import constants from "./constants";
import logger from "./util/logger";

mongoose.connect(constants.MONGODB_URI, { useNewUrlParser: true });
mongoose.set("useFindAndModify", false);

function onError(error) {
  logger.log(error, logger.LEVELS.ERROR);
}

function onConnected() {
  logger.log(
    "Database connection has been established successfully.",
    logger.LEVELS.INFO
  );
}

mongoose.connection.on("error", onError);
mongoose.connection.on("connected", onConnected);
