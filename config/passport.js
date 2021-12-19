const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Vendor = mongoose.model("vendor");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Vendor.findById(jwt_payload.id)
        .then((vendor) => {
          if (vendor) {
            return done(null, vendor);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
