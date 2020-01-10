import { AuthenticationError } from "apollo-server";

import usersDAL from "../components/users/usersDAL";
import authResolvers from "../components/auth/authResolvers";
import sitesResolvers from "../components/sites/sitesResolvers";

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
    addSite(parent, args, context) {
      return sitesResolvers.addSite(args.name, context.user.id);
    },
    destroySite(parent, args) {
      return sitesResolvers.destroySite(args.siteId);
    }
  }
};

export default resolvers;
