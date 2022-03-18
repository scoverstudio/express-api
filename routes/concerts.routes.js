// concerts.routes.js

const express = require("express");
const router = express.Router();
const db = require("./../db");
const { v4: uuidv4 } = require("uuid");

router.route("/concerts").get((req, res) => {
  res.json(db.concerts);
});

router.route("/concerts/:id").get((req, res) => {
  res.json(db.concerts.find((el) => el.id === req.params.id));
});

router.route("/concerts").post((req, res) => {
  const { performer, genre, price, day, image } = req.body;

  if (performer && genre && price && day && image) {
    db.concerts.push({ performer, genre, price, day, image, id: uuidv4() });
    res.json({ message: "OK" });
  }
});

router.route("/concerts/:id").put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const element = db.concerts.find((el) => el.id === req.params.id);

  if (element && performer && genre && price && day && image) {
    element.performer = performer;
    element.genre = genre;
    element.price = price;
    element.day = day;
    element.image = image;
    res.json({ message: "OK" });
  }
});

router.route("/concerts/:id").delete((req, res) => {
  const index = db.concerts.findIndex((el) => el.id === req.params.id);
  db.concerts.splice(index, 1);

  res.json({ message: "OK" });
});

module.exports = router;
