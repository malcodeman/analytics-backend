import parser from "ua-parser-js";

import sessionsDAL from "./sessionsDAL";

async function addSession(parent, args) {
  const { siteId, language, userAgent, referrer } = args;
  const ua = parser(userAgent);
  const data = {
    siteId,
    language,
    userAgent,
    referrer,
    browser: ua.browser.name,
    os: ua.os.name
  };
  const session = await sessionsDAL.create(data);

  return session;
}

export { addSession };

export default {
  addSession
};
