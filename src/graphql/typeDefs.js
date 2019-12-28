import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: Int
    email: String
    firstName: String
    lastName: String
    company: String
    isVerified: Boolean
    createdAt: String
    updatedAt: String
  }
  type Login {
    token: String
    user: User
  }
  type Site {
    name: String
  }
  type Query {
    findAllUsers: [User]
    findMyself: User
  }
  type Mutation {
    signup(email: String): User
    login(email: String, password: String): Login
    updateUser(firstName: String, lastName: String, company: String): User
    addSite(name: String): Site
  }
`;

export default typeDefs;