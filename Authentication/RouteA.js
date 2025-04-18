import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from '../Api/Models/User.js'; 

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
      const user = await User.findById(userId);
      const { lname, fname } = user;

      if (!role) {
        return res.redirect(`http://localhost:3000/signup?userId=${userId}&message=You%20need%20to%20create%20an%20account%20before%20you%20log%20in.&fname=${fname}&lname=${lname}`);
      }

      res.redirect(`http://localhost:3000/home?token=${token}&userId=${userId}&role=${role}&fname=${fname}&lname=${lname}`)
      
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
