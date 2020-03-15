import { AuthenticationError } from "apollo-server";

import usersDAL from "./usersDAL";
import sessionsDAL from "../sessions/sessionsDAL";

async function findAllUsers() {
  const users = await usersDAL.findAll();

  return users;
}

async function findMyself(parent, args, context) {
  const userId = context.user.id;

  if (!userId) {
    throw new AuthenticationError("Invalid JWT");
  }

  const user = await usersDAL.findById(userId);

  return user;
}

async function findMySites(parent, args, context) {
  const userId = context.user.id;

  if (!userId) {
    throw new AuthenticationError("Invalid JWT");
  }

  const user = await usersDAL.findById(userId);
  const sites = user.sites.map(async site => {
    const session = await sessionsDAL.aggregateTotals(
      site.siteId,
      null,
      new Date()
    );

    return {
      ...site,
      ...session
    };
  });
  const data = await Promise.all(sites);

  return data;
}

async function findSite(parent, args, context) {
  const userId = context.user.id;

  if (!userId) {
    throw new AuthenticationError("Invalid JWT");
  }

  const user = await usersDAL.findById(userId);
  const siteId = args.siteId;
  const site = user.sites.find(site => {
    return site.siteId === siteId;
  });

  return site;
}

export { findAllUsers, findMyself, findMySites, findSite };

export default {
  findAllUsers,
  findMyself,
  findMySites,
  findSite
};
