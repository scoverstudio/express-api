// seats.routes.js

const express = require("express");
const router = express.Router();

const seatController = require("../controllers/seats.controller");

router.get("/seats", seatController.getAll);
router.get("/seats/:id", seatController.getById);
router.post("/seats/", seatController.addSeat);
router.put("/seats/:id", seatController.modifySeatByID);
router.delete("/seats/:id", seatController.deleteSeatByID);

module.exports = router;
