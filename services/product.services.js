const Tour = require("../models/tour");
exports.getAllToursService = async (filters, fields, sort, pagination) => {
  const tours = await Tour.find(filters)
    .skip(pagination.skip)
    .limit(pagination.limit)
    .select(fields)
    .sort(sort);
  return tours;
};

exports.createTourService = async (data) => {
  const tour = await Tour.create(data);
  return tour;
};

exports.getTourByIdService = async (id) => {
  const result = await Tour.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  );
  return result;
};

exports.updateTourByIdService = async (id, data) => {
  const result = await Tour.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

exports.getTrendingToursService = async (resultsToShow) => {
  const result = await Tour.find({})
    .limit(resultsToShow || 3)
    .sort({ views: -1, name: 1 });
  return result;
};

exports.getCheapestToursService = async (resultsToShow) => {
  const result = await Tour.find({})
    .limit(resultsToShow || 3)
    .sort({ price: 1, name: 1 });
  return result;
};
