import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userSchema.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.BACKEND_API ||
        "https://fe-kapusta-team-project.vercel.app/auth/google/callback",
      scope: ["profile", "email", "https://mail.google.com/"]
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          console.log("User exists, updating tokens...");
          existingUser.accessToken = accessToken;
          existingUser.refreshToken = refreshToken;
          await existingUser.save();
          return done(null, existingUser);
        }

        console.log("Creating a new user...");
        const newUser = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          accessToken,
          refreshToken
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        console.error("Error in Passport strategy:", err.message);
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
