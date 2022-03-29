// testimonials.routes.js
const express = require("express");
const router = express.Router();

const testimonialController = require("../controllers/testimonials.controller");

router.get("/testimonials", testimonialController.getAll);
router.get("/testimonials/random", testimonialController.getRandom);
router.get("/testimonials/:id", testimonialController.getByID);
router.post("/testimonials/", testimonialController.addTestimonial);
router.put("/testimonials/:id", testimonialController.modifyTestimonialByID);
router.delete("/testimonials/:id", testimonialController.deleteTestimonialByID);

module.exports = router;
