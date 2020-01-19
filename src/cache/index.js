import redis from "redis";
import { promisify } from "util";

import logger from "../util/logger";

const client = redis.createClient();
const get = promisify(client.get).bind(client);

client.on("error", onError);

function onError(error) {
  logger.log(error, logger.LEVELS.ERROR);
}

async function set(key, value) {
  return client.set(key, value);
}

export default {
  set,
  get
};
