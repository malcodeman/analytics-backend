import sessionsDAL from "./sessionsDAL";
import Session from "./sessionsModel";

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

async function findCharts(siteId, from, to) {
  const sessions = await Session.aggregate([
    {
      $match: {
        siteId,
        createdAt: {
          $gte: new Date(from),
          $lt: new Date(to)
        }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
        pageViews: { $sum: 1 },
        date: { $first: "$createdAt" }
      }
    },
    {
      $sort: { date: 1 }
    }
  ]);

  return sessions;
}

async function findBrowsers(siteId, from, to) {
  const sessions = await Session.aggregate([
    {
      $match: {
        siteId,
        createdAt: {
          $gte: new Date(from),
          $lt: new Date(to)
        }
      }
    },
    {
      $group: {
        _id: "$browser",
        total: { $sum: 1 },
        label: { $first: "$browser" }
      }
    },
    {
      $sort: { total: -1 }
    }
  ]);

  return sessions;
}

async function findOs(siteId, from, to) {
  const sessions = await Session.aggregate([
    {
      $match: {
        siteId,
        createdAt: {
          $gte: new Date(from),
          $lt: new Date(to)
        }
      }
    },
    {
      $group: {
        _id: "$os",
        total: { $sum: 1 },
        label: { $first: "$os" }
      }
    },
    {
      $sort: { total: -1 }
    }
  ]);

  return sessions;
}

export default {
  aggregateData,
  findCharts,
  findBrowsers,
  findOs
};
