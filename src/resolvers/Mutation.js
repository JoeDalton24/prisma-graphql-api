import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserId } from "../utils/util.js";
const ACCES_TOKEN = "276486c9aee6135040d20a9461daab70";

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
      token: jwt.sign({ userId: user.id }, ACCES_TOKEN),
    };
  },
  deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.deleteUser(
      {
        where: { id: userId },
      },
      info
    );
  },
  updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.updateUser(
      {
        data: args.data,
        where: {
          id: userId,
        },
      },
      info
    );
  },

  createPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const data = {
      ...args.data,
      author: {
        connect: {
          id: userId,
        },
      },
    };
    return prisma.mutation.createPost({ data: data }, info);
  },

  async deletePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const post = await prisma.exists.Post({
      id: args.postId,
      author: {
        id: userId,
      },
    });

    if (!post) {
      throw new Error("can't delete this post");
    }

    return prisma.mutation.deletePost({ where: { id: args.postId } }, info);
  },

  async updatePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const post = await prisma.exists.Post({
      id: args.postId,
      author: {
        id: userId,
      },
    });

    if (!post) {
      throw new Error("can't update this post");
    }

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

  async createComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const post = await prisma.exists.Post({
      id: args.data.post,
      published: true,
    });

    if (!post) {
      throw new Error("You cant comment this post !!");
    }

    const data = {
      ...args.data,
      author: {
        connect: {
          id: userId,
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

  async deleteComment(parent, { commentId }, { prisma, request }, info) {
    const userId = getUserId(request);
    const comment = await prisma.exists.Comment({
      id: commentId,
      author: {
        id: userId,
      },
    });

    if (!comment) {
      throw new Error("can't delete this comment");
    }

    return prisma.mutation.deleteComment(
      {
        where: {
          id: commentId,
        },
      },
      info
    );
  },

  async updateComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const comment = await prisma.exists.Comment({
      id: args.commentId,
      author: {
        id: userId,
      },
    });

    if (!comment) {
      throw new Error("can't update this comment");
    }

    return prisma.mutation.updateComment({
      data: args.data,
      where: {
        id: args.commentId,
      },
    });
  },

  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email,
      },
    });

    if (!user) {
      throw new Error("Invalid Credential");
    }
    const isMatch = await bcrypt.compare(args.data.password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Credential");
    }

    return {
      user,
      token: jwt.sign({ userId: user.id }, ACCES_TOKEN),
    };
  },
};

export default Mutation;
