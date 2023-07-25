const express = require("express");
const {
  getAllUsers,
  register,
  login,
} = require("../controllers/user-controller");
const router = express();

router.get("/users", getAllUsers);
router.post("/users/register", register);
router.post("/users/login", login);

exports.default = (app) => {
  app.use("/api", router);
};
