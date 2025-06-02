const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));

router.get("/google/callback", passport.authenticate("google", {
  failureRedirect: `${process.env.FRONTEND_URL}/login`,
  successRedirect: `${process.env.FRONTEND_URL}/dashboard`,
}));

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect(`${process.env.FRONTEND_URL}/login`);
  });
});

router.get("/me", (req, res) => {
  if (req.isAuthenticated()) return res.json(req.user);
  res.status(401).json({ message: "Not logged in" });
});

module.exports = router;
