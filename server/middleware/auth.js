const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'resumely_super_secure_jwt_secret_2026_key';

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. No token provided.'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, email, name }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Token verification failed or token expired.'
    });
  }
};

module.exports = { protect };
