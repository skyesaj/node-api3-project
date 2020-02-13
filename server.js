const express = require("express");
const logger = require("./middleware/logger");

const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const server = express();

server.use(express.json());
server.use(logger());
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// function logger(req, res, next) {}
// console.log(``)

// server.use(logger);
// server.use("../users", useRouter);
module.exports = server;
