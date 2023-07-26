const jwt = require("jsonwebtoken");
const { decodeToken } = require("../utils/token");

const excludedPaths = ["/api/users/login", "/api/users/register"];

const authorization = (req, res, next) => {
  if (excludedPaths.includes(req.path)) {
    next();
  } else {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (token == null) {
      res.status(401).json({
        error: true,
        message: "auth token required",
      });
    } else {
      req.user = jwt.verify(token, "secret");

      next();
    }
  }
};

module.exports = authorization;
