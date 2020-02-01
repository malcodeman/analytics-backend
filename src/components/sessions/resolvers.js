import sessionsDAL from "./sessionsDAL";

async function aggregateData(siteId) {
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

export default {
  aggregateData
};
