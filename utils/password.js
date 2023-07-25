const bcrypt = require("bcrypt");

const saltRounds = 10;

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

const checkPassword = async (password, storedPassword) => {
  return await bcrypt.compare(password, storedPassword);
};

module.exports = { hashPassword, checkPassword };
