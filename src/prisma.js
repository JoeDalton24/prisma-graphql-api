import { Prisma } from "prisma-binding";
import { fragmentReplacements } from "./resolvers/index.js";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466",
  secret: "2bd2640cd576d6bbbb7ae213000391a87ea95bdb86021e944c8daf39ff856fb7",
  fragmentReplacements,
});

export default prisma;

// export default
