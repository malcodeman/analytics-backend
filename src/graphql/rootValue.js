import usersResolvers from "../components/users/usersResolvers";
import authResolvers from "../components/auth/authResolvers";

const rootValue = {
  findAllUsers: () => usersResolvers.findAllUsers(),
  signup: args => authResolvers.signup(args.email),
  login: args => authResolvers.login(args.email, args.password)
};

export default rootValue;
