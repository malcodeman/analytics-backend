import { AuthenticationError } from "apollo-server";

import sessionsDAL from "./sessionsDAL";

async function findAllSessions() {
  const sessions = await sessionsDAL.findAll();

  return sessions;
}

async function findDashboard(parent, args, context) {
  const userId = context.user.id;

  if (!userId) {
    throw new AuthenticationError("Invalid JWT");
  }

  const siteId = args.siteId;
  const sessions = await sessionsDAL.findBySiteId(siteId);
  const userAgents = sessions.map(session => session.userAgent);
  const referrers = sessions.map(session => session.referrer);
  const languages = sessions.map(session => session.language);
  const data = {
    siteId,
    userAgents,
    referrers,
    languages,
    pageViews: sessions.length
  };

  return data;
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

export { findAllSessions, findDashboard, findCharts, findBrowsers, findOs,findTotals };

export default {
  findAllSessions,
  findDashboard,
  findCharts,
  findBrowsers,
  findOs,
  findTotals
};
