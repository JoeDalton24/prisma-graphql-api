const Query = {
  users(parent, args, { prisma }, info) {
    const optionArg = {};
    if (args.query) {
      optionArg.where = {
        OR: [
          {
            name_contains: args.query,
          },
          {
            email_contains: args.query,
          },
        ],
      };
    }
    return prisma.query.users(optionArg, info);
  },
  posts(parent, args, { prisma }, info) {
    const optionArg = {};
    if (args.query) {
      optionArg.where = {
        OR: [
          {
            title_contains: args.query,
          },
          {
            body_contains: args.query,
          },
        ],
      };
    }
    return prisma.query.posts(optionArg, info);
  },

  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info);
  },
};
export default Query;
