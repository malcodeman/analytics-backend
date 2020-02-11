import Date from "./scalars/Date";
import {
  findAllSessions,
  findBrowsers,
  findCharts,
  findDashboard,
  findOs
} from "../components/sessions/sessionsQueries";
import { addSession } from "../components/sessions/sessionsMutations";
import {
  findAllUsers,
  findMySites,
  findMyself
} from "../components/users/usersQueries";
import {
  updateUser,
  addSite,
  destroySite
} from "../components/users/usersMutations";
import { signup, login } from "../components/auth/authMutations";

const resolvers = {
  Date,
  Query: {
    findAllSessions,
    findBrowsers,
    findCharts,
    findDashboard,
    findOs,
    findAllUsers,
    findMySites,
    findMyself
  },
  Mutation: {
    signup,
    login,
    updateUser,
    addSite,
    destroySite,
    addSession
  }
};

export default resolvers;
