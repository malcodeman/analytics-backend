import pino from "pino";

import constants from "../constants";

const logger = pino({
  prettyPrint: constants.NODE_ENV === "development"
});
const LEVELS = {
  TRACE: "trace",
  DEBUG: "debug",
  INFO: "info",
  WARN: "warn",
  ERROR: "error",
  FATAL: "fatal"
};

function log(message, level) {
  switch (level) {
    case LEVELS.TRACE:
      logger.trace(message);
      return;
    case LEVELS.DEBUG:
      logger.debug(message);
      return;
    case LEVELS.INFO:
    default:
      logger.info(message);
      return;
    case LEVELS.WARN:
      logger.warn(message);
      return;
    case LEVELS.ERROR:
      logger.error(message);
      return;
    case LEVELS.FATAL:
      logger.fatal(message);
      return;
  }
}

export default {
  LEVELS,
  log
};
