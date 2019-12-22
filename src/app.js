import express from "express";
import graphqlHTTP from "express-graphql";

import { NODE_ENV } from "./constants";
import schema from "./graphql/schema";
import rootValue from "./graphql/rootValue";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: NODE_ENV === "development"
  })
);

export default app;
