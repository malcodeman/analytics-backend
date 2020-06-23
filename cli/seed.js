import mongoose from "mongoose";

import usersDAL from "../src/components/users/usersDAL";
import sessionsDAL from "../src/components/sessions/sessionsDAL";
import logger from "../src/util/logger";
import constants from "../src/constants";
import util from "../src/util";

async function createUser() {
  const values = {
    email: "rickdeckard@gmail.com",
    firstName: "Rick",
    lastName: "Deckard",
    company: "Tyrell Corporation",
    isVerified: true,
  };
  const user = await usersDAL.create(values);

  return user;
}

async function addSite(userId) {
  const siteId = await util.generateId();
  const values = {
    siteId,
    domain: "https://www.malcodeman.com",
    name: "Personal website",
  };
  const site = await usersDAL.addSite(userId, values);

  return site;
}

async function createSession(siteId) {
  const values = {
    siteId,
    language: "en-US",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:77.0) Gecko/20100101 Firefox/77.0",
    browser: "Firefox",
    os: "Mac OS",
  };
  const session = await sessionsDAL.create(values);

  return session;
}

async function seed() {
  try {
    await mongoose.connect(constants.MONGODB_URI, {
      useNewUrlParser: true,
    });

    const userId = await createUser();
    const site = await addSite(userId._id);

    await createSession(site.siteId);

    logger.log("Seed successful.");

    process.exit();
  } catch (error) {
    logger.log(error, logger.LEVELS.ERROR);

    process.exit(1);
  }
}

seed();
