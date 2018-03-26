const express = require("express");
const router = express.Router();
const db = require("../db/models");

router.get("/", (req, res) => {
  db
    .Blog
    .findAll()
    .then(blogs => {
      res
        .status(200)
        .json(blogs);
    });
});

router.get("/featured", (req, res) => {
  db
    .Blog
    .findAll({
      where: {
        featured: true
      }
    })
    .then(blogs => {
      res
        .status(200)
        .json(blogs);
    });
});

router.get("/:id", (req, res) => {
  let idToReplace = req.params.id;
  db
    .Blog
    .findById(idToReplace)
    .then(blogs => {
      if (blogs) 
        return res.status(200).send(blogs);
      else 
        return res
          .status(404)
          .send();
      }
    )
    .catch(console.error);
});

router.post("/", (req, res) => {
  let userId = req.query.authorId;
  db
    .Blog
    .create({
      authorId: userId,
      title: req.body.title,
      article: req.body.article,
      published: req.body.published,
      featured: req.body.featured,
      _id: userId
    })
    .then(blog => {
      res
        .status(201)
        .send(blog);
    })
    .catch(console.error);
});

router.put("/:id", (req, res) => {
  let idToReplace = req.params.id;
  db
    .Blog
    .update({
      title: req.body.title,
      article: req.body.article,
      published: req.body.published,
      featured: req.body.featured
    }, {
      where: {
        id: {
          $eq: idToReplace
        }
      }
    })
    .then(blogs => {
      res
        .status(204)
        .send(blogs);
    });
});

router.delete("/:id", (req, res) => {
  let idToReplace = req.params.id;
  let id = idToReplace.replace(":", "");
  db
    .Blog
    .findById(id)
    .then(blogs => {
      return blogs.destroy();
    })
    .then(() => {
      res
        .status(200)
        .send();
    })
    .catch(console.error);
});

module.exports = router;