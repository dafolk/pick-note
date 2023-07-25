const express = require("express");
const mongoose = require("mongoose");
const glob = require("glob");
const { getAllUsers, createUser } = require("./controllers/user-controller");

const PORT = 4003;
const app = express();

app.use(express.json());

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
