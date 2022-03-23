const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email });

    if (emailTaken) {
      throw new Error("email exist");
    }

    const user = await prisma.mutation.createUser({ data: args.data }, info);

    return user;
  },
  async deleteUser(parent, args, { prisma }, info) {
    // const { userId } = args;
    const isUserExist = await prisma.exists.User({ id: args.userId });

    if (!isUserExist) {
      throw new Error("User not exist");
    }

    const user = await prisma.mutation.deleteUser(
      {
        where: { id: args.userId },
      },
      info
    );

    return user;
  },
  async updateUser(parent, args, { prisma }, info) {
    const isUserExist = await prisma.exists.User({ id: args.userId });

    if (!isUserExist) {
      throw new Error("user not found");
    }

    const user = await prisma.mutation.updateUser(
      {
        data: args.data,
        where: {
          id: args.userId,
        },
      },
      info
    );

    return user;
  },

  // pour la creation de poste soit on peut fournir un user oubien en creer une
  async createPost(parent, args, { prisma, pubsub }, info) {
    const isUserExist = await prisma.exists.User({ id: args.data.author });
    if (!isUserExist) throw new Error("User not Exist");

    const data = {
      ...args.data,
      author: {
        connect: {
          id: args.data.author,
        },
      },
    };
    const post = await prisma.mutation.createPost({ data: data }, info);

    return post;
  },

  async deletePost(parent, { postId }, { prisma }, info) {
    return prisma.mutation.deletePost({ where: { id: postId } }, info);
  },

  updatePost(parent, args, { prisma }, info) {
    return prisma.mutation.updatePost(
      {
        data: args.data,
        where: {
          id: args.postId,
        },
      },
      info
    );
  },

  async createComment(parent, args, { prisma }, info) {
    const post = await prisma.query.post({
      where: {
        id: args.data.post,
      },
    });

    if (!post || !post.published) {
      throw new Error("you cant commet this post !!");
    }
    const data = {
      ...args.data,
      author: {
        connect: {
          id: args.data.author,
        },
      },
      post: {
        connect: {
          id: args.data.post,
        },
      },
    };
    return prisma.mutation.createComment({ data: data }, info);
  },

  deleteComment(parent, { commentId }, { prisma }, info) {
    return prisma.mutation.deleteComment(
      {
        where: {
          id: commentId,
        },
      },
      info
    );
  },

  updateComment(parent, args, { prisma }, info) {
    return prisma.mutation.updateComment({
      data: args.data,
      where: {
        id: args.commentId,
      },
    });
  },
};

export default Mutation;
