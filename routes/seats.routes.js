// seats.routes.js

const express = require("express");
const router = express.Router();
const db = require("./../db");
const { v4: uuidv4 } = require("uuid");

router.route("/seats").get((req, res) => {
  res.json(db.seats);
});

router.route("/seats/:id").get((req, res) => {
  res.json(db.seats.find((el) => el.id === req.params.id));
});

router.route("/seats").post((req, res) => {
  const { day, seat, client, email } = req.body;
  if (db.seats.some((el) => el.seat === seat && el.day === day)) {
    res.json({ message: "The slot is already taken..." });
  }

  if (day && seat && client && email) {
    db.seats.push({ day, seat, client, email, id: uuidv4() });
    res.json({ message: "OK" });
  }
});

router.route("/seats/:id").put((req, res) => {
  const { day, seat, client, email } = req.body;
  const element = db.seats.find((el) => el.id === req.params.id);

  if (element && day && seat && client && email) {
    element.day = day;
    element.seat = seat;
    element.client = client;
    element.email = email;
    res.json({ message: "OK" });
  }
});

router.route("/seats/:id").delete((req, res) => {
  const index = db.seats.findIndex((el) => el.id === req.params.id);
  db.seats.splice(index, 1);

  res.json({ message: "OK" });
});

module.exports = router;
