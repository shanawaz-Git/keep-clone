"use strict";
const open = (req, res, next) => {
  res.status(200).send("hello, im ready to rock");
};
module.exports = { open };
