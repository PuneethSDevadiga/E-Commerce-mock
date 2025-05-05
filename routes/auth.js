import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; // Ensure the file extension is .js

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  let user = await User.findOne({ username });
  if (!user) {
    const hashed = await bcrypt.hash(password, 10);
    user = await User.create({ username, password: hashed });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(403).json({ error: "Invalid password" });

  const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" });
  const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET);

  user.refreshToken = refreshToken;
  await user.save();

  res.json({ accessToken, refreshToken });
});

router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  const user = await User.findOne({ refreshToken });
  if (!user) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" });
    res.json({ accessToken });
  });
});

export default router;
