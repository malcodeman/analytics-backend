import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Date
  type User {
    id: String
    email: String
    firstName: String
    lastName: String
    company: String
    isVerified: Boolean
    createdAt: Date
  }
  type Login {
    token: String
    user: User
  }
  type Site {
    name: String
    siteId: String
    domain: String
    uniqueVisits: Int
    pageViews: Int
    bounceRate: Int
  }
  type Session {
    id: String
    siteId: String
    language: String
    userAgent: String
    referrer: String
    createdAt: Date
  }
  type Dashboard {
    siteId: String
    pageViews: Int
    referrers: [String]
    languages: [String]
  }
  type Chart {
    pageViews: String
    date: Date
  }
  type UserAgentProp {
    label: String
    total: Int
  }
  type Query {
    findAllUsers: [User]
    findMyself: User
    findMySites: [Site]
    findSite(siteId: String): Site
    findAllSessions: [Session]
    findDashboard(siteId: String): Dashboard
    findCharts(siteId: String, from: String, to: String): [Chart]
    findBrowsers(siteId: String, from: String, to: String): [UserAgentProp]
    findOs(siteId: String, from: String, to: String): [UserAgentProp]
  }
  type Mutation {
    signup(
      email: String
      firstName: String
      lastName: String
      company: String
    ): User
    login(email: String, password: String): Login
    sendTemporaryPassword(email: String): User
    updateUser(firstName: String, lastName: String, company: String): User
    addSite(domain: String, name: String): Site
    destroySite(siteId: String): Boolean
    addSession(
      siteId: String
      language: String
      userAgent: String
      referrer: String
    ): Session
  }
`;

export default typeDefs;
