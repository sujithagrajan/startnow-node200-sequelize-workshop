const express = require('express');
const router = express.Router();
const db = require('../db/models');


router.get('/', (req, res) => {
  db
    .Author
    .findAll()
    .then(users => {
      res
        .status(200)
        .json(users);
    });
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  db
    .Author
    .findById(id)
    .then(author => {
      if (author) 
        return res.status(200).send(author);
      else 
        return res
          .status(404)
          .send(`Unfortunately, the author id:${id} doesn't exist.`);
      }
    );
});

router.get('/:id/blogs', (req, res) => {
  db
    .Blog
    .findAll({
      where: {
        authorId: req.params.id
      }
    })
    .then(blogs => {
      return res
        .status(200)
        .send(blogs);
    });
});

router.post('/', (req, res) => {
  let firstName = req.params.firstName;
  let lastName = req.params.lastName;
  let email = req.params.email;
  db
    .Author
    .create({firstName: firstName, lastName: lastName, email: email})
    .then(author => {
      res
        .status(201)
        .send(author);
    })
    .catch(console.error);
});

router.put('/:id', (req, res) => {
  let idToUpdate = req.params.id;
  db
    .Author
    .update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }, {
      where: {
        id: {
          $eq: idToUpdate
        }
      }
    })
    .then(author => {
      res
        .status(204)
        .send(author);
    });
});

router.delete('/:id', (req, res) => {
  let idToUpdate = req.params.id;
  db
    .Author
    .findById(idToUpdate)
    .then(author => {
      return author.destroy();
    })
    .then(() => {
      res
        .status(200)
        .send();
    })
    .catch(console.error);
});

module.exports = router;