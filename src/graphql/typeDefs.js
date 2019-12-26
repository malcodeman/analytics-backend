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
    token: String
  }
  type Query {
    findAllUsers: [User]
    findMyself: User
  }
  type Mutation {
    signup(email: String): User
    login(email: String, password: String): User
    updateUser(firstName: String, lastName: String, company: String): User
  }
`;

export default typeDefs;
