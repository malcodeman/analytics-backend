import { AuthenticationError, UserInputError } from "apollo-server";

import usersDAL from "../components/users/usersDAL";
import authResolvers from "../components/auth/authResolvers";
import sessionsDAL from "../components/sessions/sessionsDAL";
import sessionsResolvers from "../components/sessions/resolvers";
import util from "../util";

const resolvers = {
  Query: {
    findAllUsers() {
      return usersDAL.findAll();
    },
    findMyself(parent, args, context) {
      const userId = context.user.id;

      if (!userId) {
        throw new AuthenticationError("Invalid JWT");
      }

      return usersDAL.findById(userId);
    },
    findMySites(parent, args, context) {
      const userId = context.user.id;

      if (!userId) {
        throw new AuthenticationError("Invalid JWT");
      }

      return usersDAL.findMySites(userId);
    },
    findAllSessions() {
      return sessionsDAL.findAll();
    },
    async findSite(parent, args, context) {
      const userId = context.user.id;

      if (!userId) {
        throw new AuthenticationError("Invalid JWT");
      }

      const siteId = args.siteId;
      const user = await usersDAL.findSite(siteId);
      const site = user.sites.find(site => site.siteId === siteId);

      return site;
    },
    async findDashboard(parent, args, context) {
      const userId = context.user.id;

      if (!userId) {
        throw new AuthenticationError("Invalid JWT");
      }

      const user = await usersDAL.findMySites(userId);

      if (!user) {
        throw new UserInputError("Invalid siteId");
      }

      const siteId = args.siteId;
      const data = await sessionsResolvers.aggregateData(siteId);

      return data;
    }
  },
  Mutation: {
    signup(parent, args) {
      return authResolvers.signup(args.email);
    },
    login(parent, args) {
      return authResolvers.login(args.email, args.password);
    },
    async updateUser(parent, args, context) {
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

      await usersDAL.updateById(userId, values);

      return usersDAL.findById(userId);
    },
    async addSite(parent, args, context) {
      const userId = context.user.id;

      if (!userId) {
        throw new AuthenticationError("Invalid JWT");
      }

      const siteId = await util.generateId();

      return usersDAL.addSite(userId, args.name, siteId);
    },
    async destroySite(parent, args, context) {
      const userId = context.user.id;

      if (!userId) {
        throw new AuthenticationError("Invalid JWT");
      }

      const siteId = args.siteId;
      const sites = await usersDAL.findMySites(userId);

      if (!sites.find(site => site.siteId === siteId)) {
        throw new UserInputError("Invalid siteId");
      }

      return Boolean(await usersDAL.destroySite(userId, siteId));
    },
    async addSession(parent, args) {
      const { siteId, language, userAgent } = args;
      const user = await usersDAL.findSite(siteId);

      if (!user) {
        throw new UserInputError("Invalid siteId");
      }

      const data = {
        siteId,
        language,
        userAgent
      };

      return sessionsDAL.create(data);
    }
  }
};

export default resolvers;
