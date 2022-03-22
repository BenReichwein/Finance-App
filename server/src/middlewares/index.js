const jwt = require('jsonwebtoken')
const { appSecret } = require('../config/keys')
const secret = appSecret

const withAuth = function(req, res, next) {
  const token = req.query.token

  if (!token) {
    res.status(401).send('Unauthorized: You are not logged in');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(403).send('Unauthorized: Your session has expired');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}

const isAdmin = function(req, res, next) {
  const token = req.query.token;

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        if (decoded.id === '6046ff329c648230431fd533') {
          req.email = decoded.email;
          next();
        }
      }
    });
  }
}

module.exports = {withAuth, isAdmin}