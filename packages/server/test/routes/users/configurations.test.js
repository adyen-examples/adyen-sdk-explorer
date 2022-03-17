const chai = require('chai');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const { TEST_DATABASE_URL } = require('../../../config');
const { app, runServer, closeServer } = require('../../../index');
const { testUserData, testConfigData, wrongAuthToken } = require('../../structures').userTestData;

const assert = chai.assert;

chai.use(chaiHttp);

const tearDownDb = () => {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection
      .dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
};

const createMockUser = () => {
  return chai
    .request(app)
    .post('/users/')
    .send(testUserData)
    .then(res => res.body.id)
    .catch(err => console.log(err));
};

const logUserIn = () => {
  return chai
    .request(app)
    .post('/auth/login')
    .send({ username: testUserData.username, password: testUserData.password })
    .then(res => res.body.authToken)
    .catch(err => console.log(err));
};

describe.only('payments', async done => {
  const configFields = ['id', 'owner', 'name', 'version', 'configuration'];

  let authToken, userId;

  const createMockConfigurations = async () => {
    userId = await createMockUser();
    authToken = await logUserIn();
    testConfigData.owner = userId;
    return chai
      .request(app)
      .post(`/configurations/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(testConfigData)
      .then(res => res)
      .catch(err => console.log(err));
  };

  before(() => {
    return runServer(TEST_DATABASE_URL);
  });

  afterEach(() => {
    return tearDownDb();
  });

  after(() => {
    return closeServer();
  });

  it('Should create a configuration on POST', async () => {
    const mockConfig = await createMockConfigurations();
    const hasKeys = configFields.reduce((acc, x) => acc && mockConfig.body.hasOwnProperty(x));
    assert.equal(mockConfig.status, 200);
    assert.equal(hasKeys, true);
  });

  it('Should reject request for config with wrong auth token', async () => {
    const mockConfig = await createMockConfigurations();
    let agent = chai.request.agent(app);
    return agent
      .get(`/configurations/${userId}/${mockConfig.body.id}`)
      .set('Authorization', `Bearer ${wrongAuthToken}`)
      .then(res => {
        assert.equal(res.status, 401);
        return res;
      });
  });

  it('Should send back a configuration by id', async () => {
    const mockConfig = await createMockConfigurations();
    let agent = chai.request.agent(app);
    return agent
      .get(`/configurations/${userId}/${mockConfig.body.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .then(res => {
        const hasKeys = configFields.reduce((acc, x) => acc && res.body.hasOwnProperty(x));
        assert.equal(typeof res.body, 'object', 'failed res body');
        assert.equal(res.body.id, mockConfig.body.id, 'failed id check');
        assert.equal(hasKeys, true, 'failed key compare');
        return res;
      });
  });
  done();
});
