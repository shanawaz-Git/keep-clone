const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    jwt.verify(token, process.env.SECRET, function (err) {
      if (err) {
        res.status(500).send(err);
      } else {
        next();
      }
    });
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = auth;
