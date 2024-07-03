import passport from "passport";

const checkAuthJwt = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      req.logger.info(`passport.authenticate ~ user: ${user}`);
      req.logger.info(`passport.authenticate ~ info: ${info}`);

      if (err) return next(err);
      if (!user) {
        return res
          .status(401)
          .json({ message: info.message ? info.message : info.toString() });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

export default checkAuthJwt;