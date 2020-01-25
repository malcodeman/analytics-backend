import sessionsDAL from "./sessionsDAL";

async function aggregateData(siteId) {
  const sessions = await sessionsDAL.findBySiteId(siteId);
  const data = {
    siteId,
    pageViews: sessions.length,
    referrers: ["Google", "Twitter"]
  };

  return data;
}

export default {
  aggregateData
};
