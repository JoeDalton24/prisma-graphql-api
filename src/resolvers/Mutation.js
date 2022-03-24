import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const ACCES_TOKEN = process.env.ACCES_TOKEN;

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email });

    if (emailTaken) {
      throw new Error("email exist");
    }

    if (args.data.password.length < 8) {
      throw new Error("Password must contain at least 8 character");
    }
    const password = await bcrypt.hash(args.data.password, 10);

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password,
      },
    });

    return {
      user,
      token: jwt.sign({ userId: user.id }, "276486c9aee6135040d20a9461daab70"),
    };
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

  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.User({
      where: {
        email: args.email,
      },
    });

    if (!user) {
      throw new Error("user not exist");
    }

    if (!bcrypt.compare(args.data.password, user.password)) {
      throw new Error("Invalid Credential");
    }

    return {
      user,
      token: jwt.sign({ userId: user.id }, ACCES_TOKEN),
    };
  },
};

export default Mutation;
