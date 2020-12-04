const bearerToken = require('express-bearer-token');
const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;
const { jwtConfig: { secret, expiresIn } } = require('../../config');
const { User } = require("../../db/models");


function generateToken(user) {
  // TODO: Add any data you want to keep in the JWT here
  const data = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
  const jwtid = uuid();

  return {
    jti: jwtid,
    token: jwt.sign({ data }, secret, { expiresIn: Number.parseInt(expiresIn), jwtid })
  };
}

function restoreUser(req, res, next) {
  const { token } = req;

  if (!token) {
    return next({ status: 401, message: 'no token' });
  }

  return jwt.verify(token, secret, null, async (err, payload) => {
    if (err) {
      err.status = 403;
      return next(err);
    }

    const tokenId = payload.jti;

    async function findByTokenId(tokenId) {
        const user = await User.findOne({ where: { tokenId } });
        return user
    }

    try {
      req.user = await findByTokenId(tokenId);
    } catch (e) {
      return next(e);
    }

    if (!req.user.isValid()) {
      return next({ status: 404, message: 'session not found' });
    }

    next();
  });
}

const authenticated = [bearerToken(), restoreUser];

module.exports = { generateToken, authenticated };
