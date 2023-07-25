const userModel = require("../models/user-schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/token");
const { hashPassword } = require("../utils/password");

const saltRounds = 10;
const secretKey = "secret";

const createUser = async (req, res) => {
  const data = req.body;

  const newUser = await userModel.create({
    username: data.username,
    password: await hashPassword(data.password),
    token: generateToken(data.username, secretKey),
  });
  res.status(200).json({
    username: newUser.username,
    password: newUser.password,
    token: newUser.token,
    created_at: newUser.createdAt,
    updated_at: newUser.updatedAt,
  });
};

const getAllUsers = async (req, res) => {
  res.status(200).json(await userModel.find());
};

module.exports = { createUser, getAllUsers };
