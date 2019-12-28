import usersDAL from "../components/users/usersDAL";
import authResolvers from "../components/auth/authResolvers";
import sitesDAL from "../components/sites/sitesDAL";

const resolvers = {
  Query: {
    findAllUsers() {
      return usersDAL.findAll();
    },
    findMyself(parent, args, context) {
      const userId = context.user.id;

      return usersDAL.findById(userId);
    },
    findMySites(parent, args, context) {
      const userId = context.user.id;

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
      const userId = context.user.id;
      const { name } = args;

      return sitesDAL.create(name, userId);
    }
  }
};

export default resolvers;
