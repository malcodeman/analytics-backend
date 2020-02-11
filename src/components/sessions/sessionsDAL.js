import Session from "./sessionsModel";

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

export {
  create,
  findAll,
  findBySiteId,
  aggregatePageViews,
  aggregateBrowsers,
  aggregateOs
};

export default {
  create,
  findAll,
  findBySiteId,
  aggregatePageViews,
  aggregateBrowsers,
  aggregateOs
};
