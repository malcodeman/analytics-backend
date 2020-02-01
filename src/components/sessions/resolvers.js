import sessionsDAL from "./sessionsDAL";

async function aggregateData(siteId) {
  const sessions = await sessionsDAL.findBySiteId(siteId);
  const userAgents = sessions.map(session => session.userAgent);
  const referrers = sessions.map(session => session.referrer);
  const data = {
    siteId,
    userAgents,
    referrers,
    pageViews: sessions.length
  };

  return data;
}

export default {
  aggregateData
};
