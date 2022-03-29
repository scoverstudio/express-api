// concerts.routes.js

const express = require("express");
const router = express.Router();

const concertController = require("../controllers/concerts.controller");

router.get("/concerts", concertController.getAll);
router.get("/concerts/:id", concertController.getByID);
router.post("/concerts/", concertController.addConcert);
router.put("/concerts/:id", concertController.modifyConcertByID);
router.delete("/concerts/:id", concertController.deleteConcertByID);

module.exports = router;
