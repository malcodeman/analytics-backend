import redis from "redis";
import { promisify } from "util";

import logger from "../util/logger";

const client = redis.createClient();
const get = promisify(client.get).bind(client);

client.on("error", onError);
client.on("ready", onReady);

function onError(error) {
  logger.log(error, logger.LEVELS.ERROR);
}

function onReady(error) {
  logger.log(
    "Cache connection has been established successfully.",
    logger.LEVELS.INFO
  );
}

async function set(key, value) {
  return client.set(key, value);
}

export default {
  set,
  get
};
