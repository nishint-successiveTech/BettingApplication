import { createServer } from "./server";

const PORT = process.env.GRAPHQL_PORT || 4000;

createServer().then((httpServer) => {
  httpServer.listen(PORT, () => {
    console.log(` GraphQL Server running at http://localhost:${PORT}/graphql`);
    console.log(` Subscriptions ready at ws://localhost:${PORT}/graphql`);
  });
});
