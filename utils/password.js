const bcrypt = require("bcrypt");

const saltRounds = 10;

const salt = await bcrypt.genSalt(saltRounds);

const hashPassword = async (password) => {
  return await bcrypt.hash(password, salt);
};

const checkPassword = async (password, storedPassword) => {
  return await bcrypt.compare(password, storedPassword);
};

module.exports = { hashPassword, checkPassword };
