const mongoose = require("mongoose");

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [6, "At least 6 characters required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  location: {
    lat: {
      type: Number,
      required: true,
      default: "0.000",
    },
    lng: {
      type: Number,
      required: true,
      default: "0.000",
    },
    name: {
      type: String,
      required: true,
    },
  },
  price: {
    type: Number,
    min: [0, "Price can't be less than 0"],
  },
  views: {
    type: Number,
    min: [0, "Views can't be less than 0"],
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Tour", tourSchema);
