// seats.routes.js

const express = require("express");
const router = express.Router();
const db = require("./../db");
const { v4: uuidv4 } = require("uuid");

router.route("/seats").get((req, res) => {
  res.json(db.seats);
});

router.route("/seats/:id").get((req, res) => {
  res.json(db.seats.find((el) => el.id.toString() === req.params.id));
});

router.route("/seats").post((req, res) => {
  const { day, seat, client, email } = req.body;
  if (
    db.seats.some(
      (el) => el.seat.toString() === seat && el.day.toString() === day
    )
  ) {
    res.json({ message: "The slot is already taken..." });
  }

  if (day && seat && client && email) {
    db.seats.push({ day, seat, client, email, id: uuidv4() });
    res.json({ message: "OK" });
  }
});

router.route("/seats/:id").put((req, res) => {
  const { day, seat, client, email } = req.body;
  db.seats.find((el) =>
    el.id.toString() === req.params.id
      ? ((el.day = day),
        (el.seat = seat),
        (el.client = client),
        (el.email = email))
      : ""
  );
  if (day && seat && client && email) {
    res.json({ message: "OK" });
  }
});

router.route("/seats/:id").delete((req, res) => {
  const index = db.seats
    .map((el) => el.id === req.params.id)
    .indexOf(req.params.id);
  db.seats.splice(index, 1);
  res.json({ message: "OK" });
});

module.exports = router;
