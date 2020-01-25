import Session from "./sessionsModel";

export async function create(data) {
  const session = await Session.create(data);

  return session;
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
