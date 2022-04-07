const {
  getAvailableSeatsForDay,
} = require("../helpers/getAvailableSeatsForDay");
const Concert = require("../models/concert.model");
const Seat = require("../models/seat.model");

exports.getAll = async (req, res) => {
  try {
    const allSeats = await Seat.find();
    const concerts = (await Concert.find().lean()).map((concert) => {
      return {
        ...concert,
        tickets: getAvailableSeatsForDay(concert.day, allSeats),
      };
    });
    res.json(await concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByID = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if (!con) res.status(404).json({ message: "Not found" });
    else res.json(con);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addConcert = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    if (performer && genre && price && day && image) {
      const newConcert = new Concert({ performer, genre, price, day, image });
      await newConcert.save();
      res.json({ message: "OK", newConcert });
    } else res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.modifyConcertByID = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const con = await Concert.findById(req.params.id);

    if (con && performer && genre && price && day && image) {
      con.performer = performer;
      con.genre = genre;
      con.price = price;
      con.day = day;
      con.image = image;
      await con.save();
      res.json({ message: "OK", modifyConcert: con });
    } else res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteConcertByID = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if (con) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: "OK", removedDocument: con });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
