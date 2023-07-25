const express = require("express");
const { getAllUsers, createUser } = require("../controllers/user-controller");
const router = express();

router.get("/users", getAllUsers);
router.post("/users/register", createUser);

exports.default = (app) => {
  app.use("/api", router);
};
