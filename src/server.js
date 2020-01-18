import app from "./app";
import constants from "./constants";

async function start() {
  try {
    await app.listen(constants.PORT);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
