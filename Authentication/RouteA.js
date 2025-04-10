import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Google OAuth login route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async function (req, res) {
    /* istanbul ignore next */
    try {
      const userId = req.user.user._id;
      const role =req.user.role;
      const token = req.user.token;

      if (!role) {
        return res.redirect(`/dashboard.html?userId=${userId}`);
      }

      res.redirect(`/login.html?token=${token}&userId=${userId}&role=${role}`)
      
    }
     catch (error) {
      console.error("Error during Google OAuth callback:", error);
      res.redirect("/");
    }
  }
);

// Logout route
router.get("/logout", function (req, res) {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
    }
    res.redirect("/");
  });
});

export default router;
