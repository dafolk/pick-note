const jwt = require("jsonwebtoken");

const generateToken = (username, secretKey) => {
  return jwt.sign({ username: username }, secretKey, { expiresIn: "24h" });
};

const isTokenExpired = (token, secretKey) => {
  let bool = false;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      if (err.name == "TokenExpiredError") {
        bool = true;
      }
    }
  });
  return bool;
};

module.exports = { generateToken, isTokenExpired };
