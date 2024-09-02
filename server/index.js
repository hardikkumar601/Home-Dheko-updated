const express = require("express");
const Mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.js");
const userRoutes = require("./routes/user.js");
const bookingRoutes = require("./routes/booking.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/user", userRoutes);
app.use("/bookings", bookingRoutes);

// Mongoose connection
const port = process.env.PORT;
Mongoose.connect(process.env.MONGO_URL, {
  dbName: "Dream_Nest",
})
  .then(() => {
    app.listen(port, () => console.log(`Server Port: ${port}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
