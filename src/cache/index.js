import redis from "redis";
import { promisify } from "util";

const client = redis.createClient();
const get = promisify(client.get).bind(client);

async function set(key, value) {
  return client.set(key, value);
}

export default {
  set,
  get
};
