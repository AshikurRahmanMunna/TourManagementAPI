const { addTour } = require("../controllers/tours.controller");

const router = require("express").Router();

router.route("/").post(addTour);

module.exports = router;