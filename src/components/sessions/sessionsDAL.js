import Session from "./sessionsModel";
import { getRandomInt } from "../../util";

async function create(values) {
  return await Session.create(values);
}

async function findAll() {
  const sessions = await Session.find();

  return sessions;
}

async function findBySiteId(siteId) {
  const sessions = await Session.find({ siteId });

  return sessions;
}

async function aggregatePageViews(siteId, from, to) {
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

async function aggregateBrowsers(siteId, from, to) {
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

async function aggregateOs(siteId, from, to) {
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

async function aggregateTotals(siteId, from, to) {
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
    { $group: { _id: null, pageViews: { $sum: 1 } } }
  ]);
  const totals = {
    ...sessions[0],
    uniqueVisits: getRandomInt(100),
    avgDuration: getRandomInt(100),
    bounceRate: getRandomInt(100)
  };

  return totals;
}

export {
  create,
  findAll,
  findBySiteId,
  aggregatePageViews,
  aggregateBrowsers,
  aggregateOs,
  aggregateTotals
};

export default {
  create,
  findAll,
  findBySiteId,
  aggregatePageViews,
  aggregateBrowsers,
  aggregateOs,
  aggregateTotals
};
