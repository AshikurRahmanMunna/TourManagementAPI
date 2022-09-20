const Tour = require("../models/tour");
const { createTourService } = require("../services/product.services");

const getAllTours = (req, res) => {};

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
