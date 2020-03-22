import Date from "./scalars/Date";
import {
  findAllSessions,
  findBrowsers,
  findCharts,
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
  destroySite,
  updateSiteName
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
    updateSiteName,
    addSession
  }
};

export default resolvers;
