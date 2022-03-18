import chai from 'chai';
import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import { userTestData } from '../../structures';
import { TEST_DATABASE_URL } from '../../../config';
import { userHelpers } from '../../helpers';
import { app, runServer, closeServer } from '../../../index';

const assert = chai.assert;

chai.use(chaiHttp);

const { createMockUser, logUserIn } = userHelpers;

const tearDownDb = () => {
  return new Promise((resolve, reject) => {
    mongoose.connection
      .dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
};

describe('Users API', () => {
  const userFields = ['id', 'username', 'email'];

  before(() => {
    return runServer(TEST_DATABASE_URL);
  });

  afterEach(() => {
    return tearDownDb();
  });

  after(() => {
    return closeServer();
  });

  it('Should create a user on POST', async () => {
    const mockUser = await createMockUser();
    const hasKeys = userFields.reduce((acc, x) => acc && mockUser.body.hasOwnProperty(x));
    assert.equal(mockUser.status, 200, 'failed status check');
    assert.isTrue(hasKeys, 'failed key compare');
  });

  it('Should send back a user by id', async () => {
    const mockUser = await createMockUser();
    const authToken = await logUserIn();
    let agent = chai.request.agent(app);
    return agent
      .get(`/users/${mockUser.body.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .then(res => {
        const hasKeys = [...userFields, 'adyenKey', 'merchantAccounts', 'configurations'].reduce((acc, x) => acc && res.body.hasOwnProperty(x));
        assert.equal(res.status, 201, 'failed status check');
        assert.equal(typeof res.body, 'object', 'failed body type compare');
        assert.equal(res.body.id, mockUser.body.id, 'failed id compare');
        assert.isTrue(hasKeys, 'failed key compare');
        return res;
      });
  });

  it('Should update users on PUT', async () => {
    const mockUser = await createMockUser();
    const authToken = await logUserIn();
    const mockPayload = {
      id: mockUser.body.id,
      adyenKey: userTestData.wrongAuthToken,
      merchantAccounts: ['TestMerchant1', 'TestMerchant2']
    };

    let agent = chai.request.agent(app);
    return agent
      .put(`/users/${mockUser.body.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(mockPayload)
      .then(res => {
        const hasValues = mockPayload.merchantAccounts.reduce((acc, x) => acc && res.body.merchantAccounts.includes(x));
        assert.equal(res.status, 200, 'failed status check');
        assert.equal(typeof res.body, 'object', 'failed body type compare');
        assert.equal(res.body.id, mockPayload.id, 'failed id compare');
        assert.equal(res.body.adyenKey, mockPayload.adyenKey.substring(mockPayload.adyenKey.length - 5), 'failed adyenKey compare');
        assert.equal(res.body.merchantAccounts.length, 2, 'failed length compare');
        assert.isTrue(hasValues, 'failed value compare');
        return res;
      });
  });
});
