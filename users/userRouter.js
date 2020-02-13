const express = require("express");
const users = require("./userDb");
const posts = require("../posts/postDb");
// const postRouter = require("../posts/postRouter");

const router = express.Router();
// router.use("/:id/post", postRouter);
router.post("/", validateUser, (req, res) => {
  // do your magic!
  const userData = req.body;
  users
    .insert(userData)
    .then(data => res.json(data))
    .catch(error => res.status(500).json({ error: "user cant be made" }));
});

router.post("/:id/posts", validatePost, validateUserId, (req, res) => {
  posts
    .insert(req.text)
    .then(data => res.json(data))
    .catch(error => res.status(500).json({ error: "post cant be made" }));
  // do your magic!
});

router.get("/", (req, res) => {
  // do your magic!
  users
    .get()
    .then(data => res.json(data))
    .catch(error => res.status(404).json({ message: " can't find user" }));
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  res.json(req.user);
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  users
    .remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: "user deleted" });
    })
    .catch(error => res.status(404).json({ message: "couldn't delete" }));
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // do your magic!
  const userData = req.body;
  const id = req.params.id;
  users
    .update(req.params.id, req.body)
    .then(data => res.json(data))
    .catch(error => res.status(404).json({ message: "can't update" }));
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!

  // const id = req.params.id;
  users
    .getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "could not post ID" });
      }
    })
    .catch(error => res.status(500).json({ message: "couldn't get user" }));
}

function validateUser(req, res, next) {
  // do your magic!
  const userData = req.body;
  if (userData) {
    if (userData.name) {
      next();
    } else {
      res.status(404).json({ message: "missing user info" });
    }
  } else {
    res.status(404).json({ message: "missing user info" });
  }
}

function validatePost(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    resource = {
      text: req.body.text,
      user_id: req.params.id
    };
    if (!req.body.text) {
      return res.status(404).json({ message: "missing" });
    } else {
      req.text = resource;
      next();
    }
  };
}

module.exports = router;
