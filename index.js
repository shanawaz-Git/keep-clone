const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("./db-config/config");
const getRouter = require("./routes/getRoute");
const postRouter = require("./routes/postRoute");

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", getRouter.routes);
app.use("/post", postRouter.routes);

app.listen(port, () => {
  console.log(`the server is running on localhost:${port}`);
});
