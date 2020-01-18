import { AuthenticationError, UserInputError } from "apollo-server";

import usersDAL from "../components/users/usersDAL";
import authResolvers from "../components/auth/authResolvers";
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

      return usersDAL.findSites(userId);
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
      const sites = await usersDAL.findSites(userId);

      if (!sites.find(site => site.siteId === siteId)) {
        throw new UserInputError("Invalid siteId");
      }

      return Boolean(await usersDAL.destroySite(userId, siteId));
    }
  }
};

export default resolvers;
