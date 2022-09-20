const { addTour, getTourById, updateTourById, getTrendingTours, getCheapestTours, getAllTours } = require("../controllers/tours.controller");

const router = require("express").Router();

router.route("/").get(getAllTours).post(addTour);
router.route('/trending').get(getTrendingTours)
router.route('/cheapest').get(getCheapestTours)
router.route("/:id").get(getTourById).patch(updateTourById);

module.exports = router;