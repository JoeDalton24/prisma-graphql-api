import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db.js";
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Post from "./resolvers/Post.js";
import User from "./resolvers/User.js";
import Comment from "./resolvers/Comment.js";
import Subscription from "./resolvers/Subscription.js";
import prisma from "./prisma.js";

const pubsub = new PubSub();

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Post,
  User,
  Comment,
};
const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context(request) {
    return {
      db,
      pubsub,
      prisma,
      request,
    };
  },
});

server.start(() => {
  console.log("server is Running on port 4000");
});
