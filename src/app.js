import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

import constants from "./constants";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import util from "./util";

mongoose.connect(constants.MONGODB_URI, { useNewUrlParser: true });
mongoose.set("useFindAndModify", false);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: constants.NODE_ENV === "development",
  context: ({ req }) => {
    const token = req.headers.authorization || "";

    if (token) {
      const decoded = util.jwt.verify(token);
      const user = {
        id: decoded.id
      };

      return { user };
    }

    return { user: { id: null } };
  }
});

export default server;
