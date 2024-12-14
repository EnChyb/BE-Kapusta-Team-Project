import jwt from 'jsonwebtoken';
import { Session } from '../models/session.js';


const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

 // Sprawdź, czy token znajduje się na liście unieważnionych tokenów
  const blacklistedToken = await Session.findOne({ token });
  if (blacklistedToken) {
    return res.status(401).json({ message: 'Token has been blacklisted' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token.' });
  }
};

export default authenticateToken;
