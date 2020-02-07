import parser from "ua-parser-js";

import Session from "./sessionsModel";

export async function create(data) {
  const ua = parser(data.userAgent);
  const session = {
    ...data,
    browser: ua.browser.name,
    os: ua.os.name
  };

  return await Session.create(session);
}

export async function findAll() {
  const sessions = await Session.find();

  return sessions;
}

export async function findBySiteId(siteId) {
  const sessions = await Session.find({ siteId });

  return sessions;
}

export default { create, findAll, findBySiteId };
