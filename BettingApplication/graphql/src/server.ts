import express, { Application } from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PubSub } from "graphql-subscriptions";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolver";

export async function createServer(): Promise<http.Server> {
  const app: Application = express();
  const httpServer = http.createServer(app);
  const pubsub = new PubSub();

  // Combine typeDefs & resolvers
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Apollo server
  const server = new ApolloServer({
    schema,
    context: () => ({ pubsub }),
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  // Subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  useServer({ schema, context: () => ({ pubsub }) }, wsServer);

  return httpServer;
}
