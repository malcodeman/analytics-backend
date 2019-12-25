import { ApolloServer } from "apollo-server";

import { NODE_ENV } from "./constants";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: NODE_ENV === "development"
});

export default server;
