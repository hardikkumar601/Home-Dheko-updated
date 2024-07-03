const express = require('express');
const Router = express.Router();
const zod = require('zod');
const Booking = require("../models/Booking");

const bookingBody = zod.object({
  customerId: zod.string(),
  listingId: zod.string(),
  hostId: zod.string(),
  startDate: zod.string(),
  endDate: zod.string(),
  totalPrice: zod.number(),
});

Router.post("/create", async (req, res) => {
  const result = bookingBody.safeParse(req.body);
  console.log(req.body);

  if (!result.success) {
    res.status(403).json({ message: "sending invalid data" });
    return; // Add return statement to exit the function
  }
  try {
    const { customerId, listingId, hostId, startDate, endDate, totalPrice } =
      result.data;

    const newBooking = new Booking({
      customerId,
      listingId,
      hostId,
      startDate,
      endDate,
      totalPrice,
    });
    await newBooking.save();
    res.status(200).json(newBooking);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "Fail to create a new Booking!", error: err.message });
  }
});

module.exports = Router;
