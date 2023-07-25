const userModel = require("../models/user-schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken, isTokenExpired } = require("../utils/token");
const { hashPassword, checkPassword } = require("../utils/password");

const saltRounds = 10;
const secretKey = "secret";

const register = async (req, res) => {
  const data = req.body;

  const newUser = await userModel.create({
    username: data.username,
    password: await hashPassword(data.password),
    token: generateToken(data.username, secretKey),
  });
  res.status(201).json({
    username: newUser.username,
    password: newUser.password,
    token: newUser.token,
    created_at: newUser.createdAt,
    updated_at: newUser.updatedAt,
  });
};

const login = async (req, res) => {
  const data = req.body;

  const user = await userModel.findOneAndUpdate(
    { username: data.username },
    { token: generateToken(data.username, secretKey) }
  );

  if (await checkPassword(data.password, user.password)) {
    res.status(200).json({
      message: "Login approved",
      error: false,
      loginData: user,
    });
  } else {
    res.status(401).json({
      message: "Username or password incorrect",
      error: true,
      loginData: user,
    });
  }
};

const getAllUsers = async (req, res) => {
  res.status(200).json(await userModel.find());
};

module.exports = { register, getAllUsers, login };
