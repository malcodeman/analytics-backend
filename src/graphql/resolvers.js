import usersDAL from "../components/users/usersDAL";
import authResolvers from "../components/auth/authResolvers";

const resolvers = {
  Query: {
    findAllUsers() {
      return usersDAL.findAll();
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
    }
  }
};

export default resolvers;
