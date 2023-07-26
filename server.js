const express = require("express");
const mongoose = require("mongoose");
const glob = require("glob");
const authorization = require("./middleware/auth-middleware");
const cors = require("cors");

const PORT = 4003;
const app = express();

app.use(cors());
app.use(express.json());
app.use(authorization);

mongoose
  .connect("mongodb://pick-note:picknote@localhost:27017/pick-note")
  .then(console.log("DB connected"))
  .catch((err) => {
    console.log(err);
  });

const routes = glob.sync(`${__dirname}/routes/*.js`);

routes.forEach((item) => {
  require(item).default(app);
});

app.listen(PORT, () => {
  console.log(`Server is active on http://localhost:${PORT}.`);
});
