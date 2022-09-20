const {
  createTourService,
  getTourByIdService,
  updateTourByIdService,
  getTrendingToursService,
  getCheapestToursService,
  getAllToursService,
} = require("../services/product.services");

exports.getAllTours = async (req, res) => {
  try {
    let fields = "";
    let sort = "";
    const { page = 1, limit = 10 } = req.query;

    let filters = { ...req.query };
    const fieldsToRemove = ["sort", "page", "limit", "fields"];
    fieldsToRemove.forEach((field) => delete filters[field]);
    let stringified = JSON.stringify(filters);
    stringified = stringified.replace(
      /\b(gt|gte|lt|lte|ne|eq)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(stringified);

    const pagination = {
      skip: (page - 1) * parseInt(limit),
      limit: req.query.limit || 10,
    };

    if (req.query.fields) {
      fields = req.query.fields.split(",").join(" ");
    }

    if (req.query.sort) {
      sort = req.query.sort.split(",").join(" ");
    }

    const tours = await getAllToursService(filters, fields, sort, pagination);
    return res.status(200).json(tours);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something wen't wrong",
      error: error.message,
    });
  }
};

exports.addTour = async (req, res) => {
  try {
    const tour = await createTourService(req.body);
    return res
      .status(200)
      .json({ success: true, message: "Tour added successfully", tour });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something wen't wrong",
      error: error.message,
    });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const tour = await getTourByIdService(req.params.id);
    return res.status(200).json(tour);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Can't get the tour",
      error: error.message,
    });
  }
};
exports.updateTourById = async (req, res) => {
  try {
    const tour = await updateTourByIdService(req.params.id, req.body);
    return res.status(200).json(tour);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Can't update the tour",
      error: error.message,
    });
  }
};

exports.getTrendingTours = async (req, res) => {
  try {
    const tours = await getTrendingToursService(req.query.resultsToShow);
    return res.status(200).json(tours);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Can't get trending tours",
      error: error.message,
    });
  }
};

exports.getCheapestTours = async (req, res) => {
  try {
    const tours = await getCheapestToursService(req.query.resultsToShow);
    return res.status(200).json(tours);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Can't get cheapest tours",
      error: error.message,
    });
  }
};
