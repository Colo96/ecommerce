const passport = require("passport");
const passportJwt = require("passport-jwt");
const { HTTP_STATUS } = require("../utils/api.utils");
const ENV_CONFIG = require("../config/env.config");
const { cookieExtractor } = require("../utils/session.utils");

const jwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const { SECRET_KEY } = ENV_CONFIG;

passport.use(
  new jwtStrategy(
    {
      secretOrKey: SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    },
    async (jwt_payload, done) => {
      try {
        done(null, jwt_payload);
      } catch (error) {
        done(error);
      }
    }
  )
);

const passportCustom = (strategy, options = {}) => {
  return async (req, res, next) => {
    await passport.authenticate(
      strategy,
      { session: false, ...options },
      (error, user, info) => {
        if (error) {
          return next(error);
        }
        if (!user) {
          return res
            .status(HTTP_STATUS.UNAUTHORIZED)
            .json({ error: info.message ?? `${info}` });
        }
        req.user = user;
        next();
      }
    )(req, res, next);
  };
};

module.exports = passportCustom;
