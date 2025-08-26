import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolver"; 

export async function startGraphQL() {
  const app: Application = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers, 
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  const PORT = process.env.GRAPHQL_PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 GraphQL Server running at http://localhost:${PORT}/graphql`);
  });
}
