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
      

      if (!role) {
<<<<<<< HEAD
        return res.redirect(`http://localhost:3000/login?userId=${userId}&message=You%20need%20to%20create%20an%20account%20before%20logging%20in.`);
=======
        return res.redirect(`http://localhost:3000/login?userId=${userId}&message=You%20need%20to%20create%20an%20account%20before%20you%20log%20in.`);
>>>>>>> 401b0658e20493c294d1ba47e1b67171eac6c726
      }
      const { lname, fname } = user;
      res.redirect(`http://localhost:3000/?token=${token}&userId=${userId}&role=${role}&fname=${fname}&lname=${lname}`)
      
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
