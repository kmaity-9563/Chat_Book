const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const SECRET = 'iamkm';

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET, async (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        try {
          req.user = user;
          console.log('User:', user);
          next();
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authentication;
