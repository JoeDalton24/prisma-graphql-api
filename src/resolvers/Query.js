import { getUserId } from "../utils/util.js";

const Query = {
  users(parent, args, { prisma }, info) {
    const optionArg = {
      first: args.first,
      skip: args.skip,
    };
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

  posts(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false);

    const optionArg = {
      first: args.first,
      skip: args.skip,
    };

    if (userId === null) {
      optionArg.where = {
        published: true,
      };
    }

    if (userId) {
      optionArg.where = {
        OR: [
          { published: true },
          {
            author: {
              id: userId,
            },
          },
        ],
      };
    }

    if (args.query) {
      const previousOption = { ...optionArg.where };
      optionArg.where = {
        AND: [
          { ...previousOption },
          {
            OR: [
              {
                title_contains: args.query,
              },
              {
                body_contains: args.query,
              },
            ],
          },
        ],
      };
    }

    return prisma.query.posts(optionArg, info);
  },

  comments(parent, args, { prisma }, info) {
    const optionArg = {
      first: args.first,
      skip: args.skip,
    };
    return prisma.query.comments(optionArg, info);
  },

  async post(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false);

    const posts = await prisma.query.posts({
      where: {
        id: args.postId,
        OR: [
          { published: true },
          {
            author: {
              id: userId,
            },
          },
        ],
      },
    });

    if (!posts.length) {
      throw new Error("posts not found");
    }

    return posts[0];
  },

  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.query.user({ where: { id: userId } }, info);
  },
};
export default Query;
