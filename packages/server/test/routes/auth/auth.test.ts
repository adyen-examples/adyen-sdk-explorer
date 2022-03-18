import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import { User } from '../../../models';
import { userTestData } from '../../structures';
import { JWT_SECRET, TEST_DATABASE_URL } from '../../../config';
import { app, runServer, closeServer } from '../../../index';

const assert = chai.assert;

chai.use(chaiHttp);

const {
  testUserData: { username, password, email }
} = userTestData;

describe('Authorization API', () => {
  let _id: string;
  before(() => {
    return runServer(TEST_DATABASE_URL);
  });

  after(() => {
    return closeServer();
  });

  beforeEach(async () => {
    const hashedPassword = await User.hashPassword(password);
    if (hashedPassword) {
      const { id } = await User.create({
        username,
        password: hashedPassword,
        email
      });
      if (id) {
        _id = id;
      }
    }
  });

  afterEach(() => {
    return User.deleteOne({ _id });
  });

  describe('/login', () => {
    it('Should reject requests with no credentials', async () => {
      try {
        return await chai.request(app).post('/auth/login');
      } catch (err: any) {
        if (err instanceof chai.AssertionError) {
          throw err;
        }

        const res = err.response;
        assert.equal(res.status, 400);
      }
    });

    it('Should reject requests with incorrect usernames', async () => {
      try {
        return await chai.request(app).post('/auth/login').auth('wrongUsername', password);
      } catch (err: any) {
        if (err instanceof chai.AssertionError) {
          throw err;
        }

        const res = err.response;
        assert.equal(res.status, 400);
      }
    });

    it('Should reject requests with incorrect passwords', async () => {
      try {
        return await chai.request(app).post('/auth/login').auth(username, 'wrongPassword');
      } catch (err: any) {
        if (err instanceof chai.AssertionError) {
          throw err;
        }

        const res = err.response;
        assert.equal(res.status, 400);
      }
    });

    it('Should return a valid auth token', async () => {
      const res = await chai.request(app).post('/auth/login').send({ username, password });
      assert.equal(res.status, 200);
      assert.equal(typeof res.body, 'object');
      const token = res.body.authToken;
      assert.equal(typeof token, 'string');
      const payload: any = jwt.verify(token, JWT_SECRET, {
        algorithms: ['HS256']
      });
      assert.equal(payload.user.username, username, 'failed username match');
      assert.equal(payload.user._id, _id, 'failed id match');
    });
  });

  describe('/auth/refresh', () => {
    it('Should reject requests with no credentials', async () => {
      try {
        return await chai.request(app).post('/auth/refresh');
      } catch (err: any) {
        if (err instanceof chai.AssertionError) {
          throw err;
        }

        const res = err.response;
        assert.equal(res.status, 401);
      }
    });

    it('Should reject requests with an invalid token', async () => {
      const token = jwt.sign(
        {
          username,
          email
        },
        'wrongSecret',
        {
          algorithm: 'HS256',
          expiresIn: '7d'
        }
      );

      try {
        return await chai.request(app).post('/auth/refresh').set('Authorization', `Bearer ${token}`);
      } catch (err: any) {
        if (err instanceof chai.AssertionError) {
          throw err;
        }

        const res = err.response;
        assert.equal(res.status, 401);
      }
    });

    it('Should reject requests with an expired token', async () => {
      const token = jwt.sign(
        {
          user: {
            username,
            email
          },
          exp: Math.floor(Date.now() / 1000) - 10 // Expired ten seconds ago
        },
        JWT_SECRET,
        {
          algorithm: 'HS256',
          subject: username
        }
      );

      try {
        return await chai.request(app).post('/auth/refresh').set('authorization', `Bearer ${token}`);
      } catch (err: any) {
        if (err instanceof chai.AssertionError) {
          throw err;
        }

        const res = err.response;
        assert.equal(res.status, 401);
      }
    });

    it('Should return a valid auth token with a newer expiry date', async () => {
      const token = jwt.sign(
        {
          user: {
            username,
            email
          }
        },
        JWT_SECRET,
        {
          algorithm: 'HS256',
          subject: username,
          expiresIn: '7d'
        }
      );
      const decoded: any = jwt.decode(token);

      const res = await chai.request(app).post('/auth/refresh').set('authorization', `Bearer ${token}`);
      assert.equal(res.status, 200);
      assert.equal(typeof res.body, 'object');

      const token_2 = res.body.authToken;
      assert.equal(typeof token_2, 'string');

      const payload: any = jwt.verify(token_2, JWT_SECRET, {
        algorithms: ['HS256']
      });
      assert.deepEqual(payload.user, { username, email });
      assert.isAtLeast(decoded.exp, payload.exp);
    });
  });
});
