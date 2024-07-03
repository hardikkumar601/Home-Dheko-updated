const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const authMiddleWare = async (req, res, next) => {
  const authHeader =req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(403).json({});
  }

  const token = authHeader.split(" ")[1];
  console.log(token)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      next();
    } else {
      return res.status(403).json({});
    }
  } catch (err) {
    res.status(403).json({
      message: "Invalid user",
    });
  }
};

module.exports = authMiddleWare;
