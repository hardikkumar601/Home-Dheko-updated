const zod = require("zod");
const Router = require("express").Router();
const multer = require("multer");
const Listing = require("../models/Listing");
const authMiddleWare = require("../middleware/authMiddleware.js");

// zod schema
const listingBody = zod.object({
  creator: zod.string(),
  category: zod.string(),
  type: zod.string(),
  streetAddress: zod.string(),
  aptSuite: zod.string(),
  city: zod.string(),
  province: zod.string(),
  country: zod.string(),
  amenities: zod.string(),
  listingPhotoPaths: zod.array(zod.string()),
  title: zod.string(),
  description: zod.string(),
  highlight: zod.string(),
  price: zod.string(),
});

// multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

Router.post(
  "/create",
  authMiddleWare,
  upload.array("myHomePhotos"),
  async (req, res) => {
    try {
      if (!req.files) {
        return res.status(400).send("No file uploaded.");
      }

      /* Take the information from the form */
      const dataToValidate = {
        ...req.body,
        listingPhotoPaths: req.files?.map((file) => file.path),
      };
      console.log(typeof(dataToValidate.amenities))
      console.log(dataToValidate);
      //zod validation
      const result = listingBody.safeParse(dataToValidate);
      console.log(result.error);
      console.log(result.data);
      if (!result.success) {
        res.status(400).json({ error: result.error });
        return;
      }

      const {
        creator,
        category,
        type,
        streetAddress,
        aptSuite,
        city,
        province,
        country,
        amenities,
        listingPhotoPaths,
        title,
        description,
        highlight,
        price,
      } =result.data;

      const newListing = new Listing({
        creator,
        category,
        type,
        streetAddress,
        aptSuite,
        city,
        province,
        country,
        amenities,
        listingPhotoPaths,
        title,
        description,
        highlight,
        price,
      });

      await newListing.save();

      res.status(200).json(newListing);
    } catch (err) {
      res
        .status(409)
        .json({ message: "Fail to create Listing", error: err.message });
      console.log(err);
    }
  }
);

Router.get("/", async (req, res) => {
  const category = req.query.category;
  let listing;
  try {
    if (category) {
      listing = await Listing.find({ category }).populate("creator");
    } else {
      listing = await Listing.find().populate("creator");
    }
    res.status(200).json(listing);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
  }
});

Router.get("/:listingId", async (req, res) => {
  const listingId = req.params.listingId;
  try {
    const listing = await Listing.findById(listingId).populate("creator");
    res.status(200).json(listing);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Listing can not found!", error: err.message });
  }
});

Router.get("/search/:search", async (req, res) => {
  const { search } = req.params;
  try {
    let listings;
    if (search === "all") {
      listings = await Listing.find().populate("creator");
    } else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
        ],
      }).populate("creator");
    }
    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
    console.log(err);
  }
});

module.exports = Router;
