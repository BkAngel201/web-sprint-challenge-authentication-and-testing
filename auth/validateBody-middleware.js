function validateBody(req, res, next) {
  const body = req.body;

  if (!body || body === {}) {
    res.status(400).json({ message: "Missing User data" });
  } else {
    if (body.username && body.password) {
      next();
    } else {
      res
        .status(400)
        .json({ message: "Missing required username and password fields" });
    }
  }
}

module.exports = {
  validateBody,
};
