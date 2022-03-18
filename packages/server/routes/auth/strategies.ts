import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { User } from '../../models';
import { JWT_SECRET } from '../../config';

export const localStrategy = new LocalStrategy(async (username, password, callback) => {
  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return Promise.reject({
        reason: 'LoginError',
        message: 'Incorrect username or password'
      });
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
      return Promise.reject({
        reason: 'LoginError',
        message: 'Incorrect username or password'
      });
    }

    return callback(null, user);
  } catch (err) {
    if (err.reason === 'LoginError') {
      return callback(null, false, err);
    }
    return callback(err, false);
  }
});

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    algorithms: ['HS256']
  },
  (payload, done) => {
    done(null, payload.user);
  }
);
