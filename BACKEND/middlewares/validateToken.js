// const asyncHandler = require("express-async-handler");
// const jwt = require("jsonwebtoken");

// const validateToken = asyncHandler((req, res, next) => {
//   let token;
//   let authHeader = req.headers.Authorization || req.headers.authorization;

//   if (authHeader && authHeader.startsWith("Bearer")) {
//     token = authHeader.split(" ")[1];

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//       if (err) {
//         res.status(401);
//         throw new Error("User is not authorized");
//       }
//       req.user = decoded.user; // attach user data to req
//       next();
//     });

//     // token is missing
//     if (!token) {
//   res.status(401);
//   throw new Error("User is not authorized or token is missing");
//   return; // stop further execution
// }

//   } 

// });

// module.exports = validateToken;
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler((req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    
    // Check if the token string is actually present after "Bearer"
    if (!token) {
        res.status(401);
        throw new Error("User is not authorized or token is missing");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded.user; // attach user data to req
      next();
    });
  } else {
    // FIX: This crucial 'else' block prevents the hang when the Authorization header is missing.
    res.status(401);
    throw new Error("User is not authorized or token is missing");
  }
});

module.exports = validateToken;
