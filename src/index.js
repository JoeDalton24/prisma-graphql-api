import { GraphQLServer } from "graphql-yoga";
import prisma from "./prisma.js";
import { resolvers, fragmentReplacements } from "./resolvers/index.js";

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context(request) {
    return {
      prisma,
      request,
    };
  },
  fragmentReplacements,
});

server.start(() => {
  console.log("server is Running on port 4000");
});
