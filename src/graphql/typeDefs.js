import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: String
    email: String
    firstName: String
    lastName: String
    company: String
    isVerified: Boolean
    createdAt: String
  }
  type Login {
    token: String
    user: User
  }
  type Site {
    id: String
    name: String
    siteId: String
  }
  type Session {
    id: String
    siteId: String
    language: String
    userAgent: String
    referrer: String
    createdAt: String
  }
  type Dashboard {
    siteId: String
    pageViews: Int
    referrers: [String]
  }
  type Query {
    findAllUsers: [User]
    findMyself: User
    findMySites: [Site]
    findAllSessions: [Session]
    findSite(siteId: String): Site
    findDashboard(siteId: String): Dashboard
  }
  type Mutation {
    signup(email: String): User
    login(email: String, password: String): Login
    updateUser(firstName: String, lastName: String, company: String): User
    addSite(name: String): Site
    destroySite(siteId: String): Boolean
    addSession(siteId: String, language: String, userAgent: String): Session
  }
`;

export default typeDefs;
