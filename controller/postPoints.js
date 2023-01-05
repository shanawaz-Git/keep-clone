"use strict";
const userInfo = require("../models/userInfo");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const userData = new userInfo(req.body);
  const result = userData
    .save()
    .then(() => {
      res.send("successfully user added");
    })
    .catch((err) => {
      if (err.code == 11000) {
        res.status(409).send("user already exist");
      } else {
        res.status(400).send(err);
      }
    });
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
