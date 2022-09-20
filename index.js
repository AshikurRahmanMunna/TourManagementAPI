const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("colors");
const os = require("os");
const mongoose = require("mongoose");
const tourRoutes = require("./routes/tour.routes");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@tourmanagementassingmen.nfuatar.mongodb.net/TourManagement?retryWrites=true&w=majority`
  )
  .then(() => console.log("Database Connected".magenta))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  const obj = {
    message: "Tour management server is running",
    platform: os.platform(),
    cpus: os.cpus(),
    architecture: os.arch(),
    memory: os.totalmem(),
    uptime: os.uptime(),
    freeMemory: os.freemem(),
  };
  res.status(200).send(obj);
});

app.use("/tours", tourRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.cyan);
});
