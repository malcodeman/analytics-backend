import redis from "redis";
import { promisify } from "util";

import logger from "../util/logger";

const client = redis.createClient();
const get = promisify(client.get).bind(client);

function onError(error) {
  logger.log(error, logger.LEVELS.ERROR);
}

function onReady() {
  logger.log(
    "Cache connection has been established successfully.",
    logger.LEVELS.INFO
  );
}

client.on("error", onError);
client.on("ready", onReady);

async function set(key, value) {
  return client.set(key, value);
}

export default {
  set,
  get
};
