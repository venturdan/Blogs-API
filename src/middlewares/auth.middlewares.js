const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const verifyToken = (bearerToken) => {
  const token = bearerToken.split(' ')[1];
  return jwt.verify(token, secret);
};

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const { sub } = verifyToken(token);
    req.body.authorId = sub;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = authMiddleware;
