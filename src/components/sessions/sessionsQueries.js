import { AuthenticationError } from "apollo-server";

import sessionsDAL from "./sessionsDAL";

async function findAllSessions() {
  const sessions = await sessionsDAL.findAll();

  return sessions;
}

async function findCharts(parent, args, context) {
  const userId = context.user.id;

  if (!userId) {
    throw new AuthenticationError("Invalid JWT");
  }

  const siteId = args.siteId;
  const from = args.from;
  const to = args.to;
  const sessions = await sessionsDAL.aggregatePageViews(siteId, from, to);

  return sessions;
}
async function findBrowsers(parent, args, context) {
  const userId = context.user.id;

  if (!userId) {
    throw new AuthenticationError("Invalid JWT");
  }

  const siteId = args.siteId;
  const from = args.from;
  const to = args.to;
  const sessions = await sessionsDAL.aggregateBrowsers(siteId, from, to);

  return sessions;
}
async function findOs(parent, args, context) {
  const userId = context.user.id;

  if (!userId) {
    throw new AuthenticationError("Invalid JWT");
  }

  const siteId = args.siteId;
  const from = args.from;
  const to = args.to;
  const sessions = await sessionsDAL.aggregateOs(siteId, from, to);

  return sessions;
}

async function findTotals(parent, args, context) {
  const userId = context.user.id;

  if (!userId) {
    throw new AuthenticationError("Invalid JWT");
  }

  const siteId = args.siteId;
  const from = args.from;
  const to = args.to;
  const sessions = await sessionsDAL.aggregateTotals(siteId, from, to);

  return sessions;
}

export { findAllSessions, findCharts, findBrowsers, findOs, findTotals };

export default {
  findAllSessions,
  findCharts,
  findBrowsers,
  findOs,
  findTotals
};
