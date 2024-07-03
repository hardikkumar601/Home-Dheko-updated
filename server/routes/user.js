const Router = require("express").Router();
const User = require("../models/user");
const Listing = require("../models/Listing");
const Booking = require("../models/Booking");

Router.get("/:userId/trips", async (req, res) => {
  const { userId } = req.params;
  try {
    const trips = await Booking.find({ customerId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(202).json(trips);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: "Can not find trips!", error: err.message });
  }
});

Router.patch("/:userId/:listingId", async (req, res) => {
  const { userId, listingId } = req.params;
  try {
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate("creator");

    const favouriteListing = user.wishList.find(
      (item) => item._id.toString() === listingId
    );
    if (favouriteListing) {
      const favouriteItemList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );
      user.wishList = favouriteItemList;
      await user.save();
      res.status(200).json({
        message: "Listing is removed from wish list",
        wishList: user.wishList,
      });
    } else {
      user.wishList.push(listing);
      await user.save();
      res.status(200).json({
        message: "Listing is added to wish list",
        wishList: user.wishList,
      });
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

Router.get("/:userId/properties", async (req, res) => {
  const { userId } = req.params;
  try {
    const properties = await Listing.find({ creator: userId }).populate(
      "creator"
    );
    res.status(202).json(properties);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: "Can not find properties!", error: err.message });
  }
});

Router.get("/:userId/reservations", async (req, res) => {
  try {
    const { userId } = req.params
    const reservations = await Booking.find({ hostId: userId }).populate("customerId hostId listingId")
    res.status(202).json(reservations)
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: "Can not find reservations!", error: err.message })
  }
})

module.exports = Router;
