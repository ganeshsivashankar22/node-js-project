const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const authMiddleware = require("../middleware/authMiddleware.js");

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedpassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedpassword
  });

  await user.save();
  res.json({ message: "user registered successfully" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "user was not found" });
  }

  const ismatch = await bcrypt.compare(password, user.password);
  if (!ismatch) {
    return res.status(400).json({ message: "incorrect credentials" });
  }

  const token = jwt.sign({ id: user._id }, "ganesh22");
  res.json({ token });
});

// UPDATE
router.put("/update", authMiddleware, async (req, res) => {
  try {
    console.log("UPDATE API HIT");

    const { name, email } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.json({
      message: "updated successfully",
      user: user
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error updating user" });
  }
});

// PROFILE
router.get("/profile", authMiddleware, (req, res) => {
  console.log("PROFILE HIT");

  res.json({
    message: "Protected data accessed",
    user: req.user
  });
});

module.exports = router;
