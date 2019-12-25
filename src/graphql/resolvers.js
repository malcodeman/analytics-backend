import usersResolvers from "../components/users/usersResolvers";
import authResolvers from "../components/auth/authResolvers";

const resolvers = {
  Query: {
    findAllUsers() {
      return usersResolvers.findAllUsers();
    }
  },
  Mutation: {
    signup(parent, args) {
      return authResolvers.signup(args.email);
    },
    login(parent, args) {
      return authResolvers.login(args.email, args.password);
    }
  }
};

export default resolvers;
