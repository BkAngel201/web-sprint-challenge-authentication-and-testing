/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const { secret, jwt } = require("./authUtils");

module.exports = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : "";
  try {
    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          res
            .status(401)
            .json({ message: "invalid or missing credentials", ...err });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).json({ message: "invalid or missing credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "error validating credentials", ...err });
  }
};
