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
  type Query {
    findAllUsers: [User]
    findMyself: User
    findMySites: [Site]
  }
  type Mutation {
    signup(email: String): User
    login(email: String, password: String): Login
    updateUser(firstName: String, lastName: String, company: String): User
    addSite(name: String): Site
    destroySite(siteId: String): Boolean
  }
`;

export default typeDefs;
