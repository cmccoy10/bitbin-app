const jwt = require("jsonwebtoken");
const { jwtConfig } = require("./config");
const { User } = require("./db/models");
const bearerToken = require("express-bearer-token");

const { secret, expiresIn } = jwtConfig;

const getUserToken = (user) => {
  // Don't store the user's hashed password
  // in the token data.
  const userDataForToken = {
    id: user.id,
    email: user.email,
  };

  // Create the token.
  const token = jwt.sign(
    { data: userDataForToken },
    secret,
    { expiresIn: parseInt(expiresIn, 10) } // 604,800 seconds = 1 week
  );

  return token;
};

const restoreUser = (req, res, next) => {
    // token being parsed from request's cookies by the cookie-parser middleware
    // function in app.js:
    // const { token } = req;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log("\n\n", typeof authHeader, authHeader, "\n\n")

    if (!token) {
      // Send a "401 Unauthorized" response status code
      console.log("\n\nNo token\n\n")
      return res.status(401).end();
    }

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      if (err) {
        console.log("\n\nError in verify\n\n")
        err.status = 401;
        return next(err);
      }

      const { id } = jwtPayload.data;

      try {
          console.log("\n\n trying to get user \n\n")
        const user = await User.findByPk(parseInt(id, 10));
        req.user = user

      } catch (e) {
          console.log("\n\nerror", e , "\n\n")
        // remove the token cookie
        res.clearCookie("token");
        return next(e);
      }

      if (!req.user) {
        // Send a "401 Unauthorized" response status code
        // along with removing the token cookie
        console.log("\n\nNo user\n\n")
        res.clearCookie("token");
        return res.status(401).end();
      }
      console.log("successful return")
      return next();
    });
};

const requireAuth = [restoreUser];

const authenticated = [bearerToken(), restoreUser];

module.exports = { getUserToken, requireAuth, authenticated };
