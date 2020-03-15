import Date from "./scalars/Date";
import {
  findAllSessions,
  findBrowsers,
  findCharts,
  findDashboard,
  findOs,
  findTotals
} from "../components/sessions/sessionsQueries";
import { addSession } from "../components/sessions/sessionsMutations";
import {
  findAllUsers,
  findMySites,
  findSite,
  findMyself
} from "../components/users/usersQueries";
import {
  updateUser,
  addSite,
  destroySite
} from "../components/users/usersMutations";
import {
  signup,
  login,
  sendTemporaryPassword
} from "../components/auth/authMutations";

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
    findSite,
    findMyself,
    findTotals
  },
  Mutation: {
    signup,
    login,
    sendTemporaryPassword,
    updateUser,
    addSite,
    destroySite,
    addSession
  }
};

export default resolvers;
