const jwt = require('jsonwebtoken');
const SECRET_KEY = '4bcd76&zP9TtD$3e!rMv@7XvRrVgV8UqcL!';

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};


module.exports = authenticate;

