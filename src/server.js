import app from "./app";
import { PORT } from "./constants";

async function start() {
  try {
    await app.listen(PORT);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
