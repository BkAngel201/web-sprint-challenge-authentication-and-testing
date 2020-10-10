const router = require("express").Router();

const Auth = require("../api/authModel");
const hashCrypt = require("bcryptjs");
const { validateBody } = require("./validateBody-middleware");
const { secret, jwt } = require("./authUtils");

router.post("/register", validateBody, async (req, res) => {
  const user = req.body;

  const passwordWithHash = hashCrypt.hashSync(user.password, 8);
  user.password = passwordWithHash;

  try {
    const inserted = await Auth.insert(user);
    res.status(201).json(inserted);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "error inserting user into DB", error: err });
  }
});

router.post("/login", validateBody, async (req, res) => {
  let { username, password } = req.body;

  try {
    let user = await Auth.findBy({ username }).first();
    console.log(user);
    if (user && hashCrypt.compareSync(password, user.password)) {
      const payload = {
        subject: user.id,
        username: user.username,
      };

      const options = {
        expiresIn: "2d",
      };

      const token = jwt.sign(payload, secret, options);

      res
        .status(200)
        .json({ message: `Welcome ${user.username}!`, token: token });
    } else {
      res.status(401).json({ message: "You shall not pass!" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "error inserting user into DB", error: err });
  }
});

module.exports = router;
