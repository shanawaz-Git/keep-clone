"use strict";
const express = require("express");

const { signup, signin } = require("../controller/postPoints");
const auth = require("../auth/auth-middleware");

const postRoute = express.Router();

postRoute.post("/signup", signup);
postRoute.post("/signin", signin);

module.exports = { routes: postRoute };
