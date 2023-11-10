const jwt = require("jsonwebtoken");

function authenticator(req, res, next) {
  // console.log(req.headers)
  // console.log(req.body)
  // console.log(req.query)
  const token = req.headers.auth;
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = payload.data;
    console.log('jwt verified successfully')
    next();
  } catch (error) {
    res.status(403).json(error);
    throw new Error(error);
  }
}

module.exports = authenticator;
