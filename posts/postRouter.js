const express = require("express");
const posts = require("./postDb");

const router = express.Router({
  mergeParams: true
});

router.get("/", (req, res) => {
  // do your magic!
  posts
    .get()
    .then(data => res.json(data))
    .catch(error => res.status(404).json({ message: "no post found" }));
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  posts
    .getById(req.params.id)
    .then(data => res.json(data))
    .catch(error => res.status(404).json({ message: "couldn't find post" }));
});

router.delete("/:id", validatePostId, (req, res) => {
  // do your magic!
  posts
    .remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: "post deleted" });
    })
    .catch(error => res.status(404).json({ message: "couldn't delete post" }));
});

router.put("/:id", validatePostId, (req, res) => {
  // do your magic!
  posts
    .update(req.params.id, req.body)
    .then(data => res.json(data))
    .catch(error => res.status(404).json({ message: "couldn't update" }));
});

// custom middleware

function validatePostId(req, res, next) {
  posts
    .getById(req.params.id)
    .then(post => {
      if (post) {
        // require.post = post;
        next();
      } else {
        res.status(400).json({ message: "couln't find post" });
      }
    })
    .catch(error => res.status(500).json({ message: "error retreiving post" }));

  // do your magic!
}

// function validatePost(req, res, next) {
//   const text = { ...req.body, post_id: req.params.id };

//   if (!req.body.text) {
//     return res.status(404).json({ message: "data missing" });
//   } else {
//     req.text = text;
//     next();
//   }
// }

module.exports = router;
