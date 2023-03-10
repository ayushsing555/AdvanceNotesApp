const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const authentication = async (req, res, next) => {
  if (req.cookies.jwt != undefined) {
    const token = req.cookies.jwt;
    const verifyId = await jwt.verify(token, process.env.SECRET_KEY);
    const userData = await User.findOne({ _id: verifyId._id });
    req.identification = userData.identification;
    req.user = userData;
    req.id = userData._id;
    next();
  } else {
     return res.status(404).json({ message: "Please login first" });
  }
};
module.exports = authentication;
