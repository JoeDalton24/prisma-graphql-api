import { extractFragmentReplacements } from "prisma-binding";

import Query from "./Query.js";
import Mutation from "./Mutation.js";
import Post from "./Post.js";
import User from "./User.js";
import Comment from "./Comment.js";
import Subscription from "./Subscription.js";

export const resolvers = {
  Query,
  Mutation,
  Post,
  User,
  Comment,
  Subscription,
};

export const fragmentReplacements = extractFragmentReplacements(resolvers);
