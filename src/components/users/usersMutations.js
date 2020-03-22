import { AuthenticationError } from "apollo-server";

import util from "../../util";
import usersDAL from "./usersDAL";

async function updateUser(parent, args, context) {
  const userId = context.user.id;

  if (!userId) {
    throw new AuthenticationError("Invalid JWT");
  }

  const { firstName, lastName, company } = args;
  const values = {
    firstName,
    lastName,
    company
  };
  const user = usersDAL.updateById(userId, values);

  return user;
}

async function addSite(parent, args, context) {
  const userId = context.user.id;

  if (!userId) {
    throw new AuthenticationError("Invalid JWT");
  }

  const domain = args.domain;
  const name = args.name;
  const siteId = await util.generateId();
  const values = {
    domain,
    name,
    siteId
  };
  const site = await usersDAL.addSite(userId, values);

  return site;
}

async function destroySite(parent, args, context) {
  const userId = context.user.id;

  if (!userId) {
    throw new AuthenticationError("Invalid JWT");
  }

  const siteId = args.siteId;
  const site = await usersDAL.destroySite(userId, siteId);

  return Boolean(site);
}

async function updateSiteName(parent, args, context) {
  const userId = context.user.id;

  if (!userId) {
    throw new AuthenticationError("Invalid JWT");
  }

  const siteId = args.siteId;
  const name = args.name;
  const site = await usersDAL.updateSiteName(userId, siteId, name);

  return site;
}

export { updateUser, addSite, destroySite, updateSiteName };

export default {
  updateUser,
  addSite,
  destroySite,
  updateSiteName
};
