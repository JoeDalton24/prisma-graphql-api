const users = [
  {
    id: "1",
    name: "khalil",
    email: "kaibrahima32@gmail.com",
  },
  {
    id: "2",
    name: "pape",
    email: "pape32@gmail.com",
  },
  {
    id: "10",
    name: "joe Dalton",
    email: "joedalton32@gmail.com",
  },
];

const posts = [
  {
    id: "1",
    title: "Design Pattern",
    body: "Why Should you learn designe pattern",
    published: true,
    author: "1",
  },
  {
    id: "2",
    title: "This Keyword",
    body: "4 way to deal with the this keyword",
    published: false,
    author: "1",
  },
  {
    id: "3",
    title: "Node Internal",
    body: "before using all this npm package did you know node internal module",
    published: false,
    author: "2",
  },
  {
    id: "4",
    title: "Learn GraphQl",
    body: "why should learn graphql",
    published: false,
    author: "1",
  },
];

const comments = [
  {
    id: "1",
    text: "this article is great",
    author: "2",
    post: "1",
  },
  {
    id: "2",
    text: "nice jobs",
    author: "2",
    post: "2",
  },
  {
    id: "3",
    text: "a like it",
    author: "1",
    post: "1",
  },
];

const db = {
  users,
  posts,
  comments,
};

export default db;
