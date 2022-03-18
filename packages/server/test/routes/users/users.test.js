const chai = require('chai');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const { wrongAuthToken } = require('../../structures').userTestData;
const { TEST_DATABASE_URL } = require('../../../config');
const { createMockUser, logUserIn } = require('./helpers');
const { app, runServer, closeServer } = require('../../../index');

const assert = chai.assert;

chai.use(chaiHttp);

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
    assert.equal(mockUser.status, 200);
    assert.equal(hasKeys, true);
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
        assert.equal(res.status, 201);
        assert.equal(typeof res.body, 'object');
        assert.equal(res.body.id, mockUser.body.id);
        assert.equal(hasKeys, true);
        return res;
      });
  });

  it('Should update users on PUT', async () => {
    const mockUser = await createMockUser();
    const authToken = await logUserIn();
    const mockPayload = {
      id: mockUser.body.id,
      adyenKey: wrongAuthToken,
      merchantAccounts: ['TestMerchant1', 'TestMerchant2']
    };

    let agent = chai.request.agent(app);
    return agent
      .put(`/users/${mockUser.body.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(mockPayload)
      .then(res => {
        const hasValues = mockPayload.merchantAccounts.reduce((acc, x) => acc && res.body.merchantAccounts.includes(x));
        assert.equal(res.status, 200);
        assert.equal(res.body.id, mockPayload.id);
        assert.equal(res.body.adyenKey, mockPayload.adyenKey.substr(mockPayload.adyenKey.length - 5));
        assert.equal(res.body.merchantAccounts.length, 2);
        assert.equal(hasValues, true);
        return res;
      });
  });
});
