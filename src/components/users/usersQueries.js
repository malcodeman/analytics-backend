import { AuthenticationError } from "apollo-server";

import usersDAL from "./usersDAL";

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
  const sites = user.sites;

  return sites;
}

export { findAllUsers, findMyself, findMySites };

export default {
  findAllUsers,
  findMyself,
  findMySites
};
