// testimonials.routes.js

const express = require("express");
const router = express.Router();
const db = require("./../db");
const { v4: uuidv4 } = require("uuid");

// get all testimonials
router.route("/testimonials").get((req, res) => {
  res.json(db.testimonials);
});

router.route("/testimonials/random").get((req, res) => {
  const item = db.testimonials[Math.floor(Math.random() * db.length)];
  res.json(item);
});

router.route("/testimonials/:id").get((req, res) => {
  res.json(db.testimonials.find((el) => el.id.toString() === req.params.id));
});

router.route("/testimonials").post((req, res) => {
  const { author, text } = req.body;

  if (author && text) {
    db.testimonials.push({ author, text, id: uuidv4() });
    res.json({ message: "OK" });
  }
});

router.route("/testimonials/:id").put((req, res) => {
  const { author, text } = req.body;
  db.testimonials.find((el) =>
    el.id.toString() === req.params.id
      ? ((el.author = author), (el.text = text))
      : ""
  );
  if (author && text) {
    res.json({ message: "OK" });
  }
});

router.route("/testimonials/:id").delete((req, res) => {
  const index = db.testimonials
    .map((el) => el.id === req.params.id)
    .indexOf(req.params.id);
  db.testimonials.splice(index, 1);
  res.json({ message: "OK" });
});

module.exports = router;
