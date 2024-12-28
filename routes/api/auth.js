import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import registerUser from "../../controllers/auth/registerUser.js";
import loginUser from "../../controllers/auth/loginUser.js";
import logoutUser from "../../controllers/auth/logoutUser.js";
import refreshUserToken from "../../controllers/auth/refreshUserToken.js";
import authenticateToken from "../../middleware/authenticateToken.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema
} from "../../middleware/validationSchemas.js";

const router = express.Router();

router.get(
  "/google",
  (req, res, next) => {
    console.log("Attempting to authenticate with Google");
    next();
  },
  passport.authenticate("google")
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login"
  }),
  (req, res) => {
    const user = req.user;

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Logged in successfully with Google",
      accessToken,
      refreshToken,
      userData: {
        id: user._id,
        email: user.email,
        balance: user.balance
      }
    });
  }
);

router.post("/register", validateRequest(registerSchema), registerUser);
router.post("/login", validateRequest(loginSchema), loginUser);
router.post("/logout", authenticateToken, logoutUser);
router.post("/refresh", validateRequest(refreshTokenSchema), refreshUserToken);

export default router;
