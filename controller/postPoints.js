"use strict";
const userInfo = require("../models/userInfo");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const userData = new userInfo(req.body);
  const result = userData
    .save()
    .then(() => {
      console.log("new user added");
    })
    .catch((err) => {
      console.log("error while saving to DB\n", err);
    });
  res.send("successfully user added");
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  userInfo.findOne({ email }, (err, response) => {
    if (err || !response) {
      console.log("login attempt : incorrect email");
      return res.status(400).json({
        error: "emial not found",
        err: err,
      });
    }
    if (!response.authenticate(password)) {
      console.log("login attempt : incorrect password");
      return res.status(400).json({ error: "incorrect password" });
    }
    const token = jwt.sign({ _id: response._id }, process.env.SECRET);
    const { _id, name, email } = response;
    console.log("successful signed in");
    return res.json({
      token,
      _id,
      name,
      email,
    });
  });
};
