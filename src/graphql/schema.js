import { buildSchema } from "graphql";

const schema = buildSchema(`
  type User {
    id: Int,
    email: String,
    isVerified: Boolean,
    createdAt: String,
    updatedAt: String,
    token: String
  },
  type Query {
    findAllUsers: [User]
  },
  type Mutation {
    signup(email: String): User
    login(email: String, password: String): User
  }
`);

export default schema;
