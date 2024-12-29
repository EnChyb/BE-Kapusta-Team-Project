import passport from "./passportConfig.js";
import redisClient from './redisClient.js';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  // Sprawdź, czy token jest na czarnej liście w Redis
  redisClient.get(token, (err, data) => {
    if (err) {
      console.error('Redis error:', err);
      return res.sendStatus(500);
    }

    if (data) {
      return res.status(403).json({ error: "Token is blacklisted. Please log in again." });
    }


  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!user) {
      if (info?.name === "TokenExpiredError") {
        return res
          .status(403)
          .json({ error: "Token expired. Please log in again." });
      }
      return res.status(401).json({ error: "Unauthorized. Invalid token." });
    }

    req.user = user;
      req.token = token; 
      next();
    })(req, res, next);
  });
};

export default authenticateToken;
