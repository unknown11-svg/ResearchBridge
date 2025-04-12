import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import User from '../Api/Models/User.js'; 
import jwt from 'jsonwebtoken'; // For generating JWT tokens

dotenv.config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      /* istanbul ignore next */
      try {
        let user = await User.findOne({ email: profile._json.email });
        
        if (!user) {
          // Create a new user
          user = new User({
            id: profile.id,
            fname: profile.name.givenName,
            lname: profile.name.familyName,
            email: profile._json.email,
            password: null,
            role: null, 
          }); 
          await user.save();
        }

         const token = jwt.sign(
                  { id: user._id, email: user.email },
                  process.env.JWT_SECRET, 
                  { expiresIn: '100h' }
                );
        
        return done(null, { user,token ,role: user.role });
      } catch (error) {
        console.error('Error during Google OAuth:', error);
        return done(error, null);
      }
    }
  )
);

/* istanbul ignore next */
passport.serializeUser((data, done) => {
  done(null, { id: data.user.id, token: data.token });
});
/* istanbul ignore next */
passport.deserializeUser(async (data, done) => {
  try {
    const user = await User.findById(data.id);
    done(null, { user, token: data.token });
  } catch (error) {
    done(error, null);
  }
});

export default passport;
