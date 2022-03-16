const chai = require('chai');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const { TEST_DATABASE_URL } = require('../../../config');
const { app, runServer, closeServer } = require('../../../index');
const { testUserData, testConfigData } = require('../../structures').userTestData;

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

describe('payments', () => {
  const configFields = ['id', 'owner', 'name', 'version', 'configuration'];
  let authToken;

  const createMockUser = () => {
    console.info('creating mock user');
    return chai
      .request(app)
      .post('/users/')
      .send(testUserData)
      .then(res => res.body.id)
      .catch(err => console.log(err));
  };

  const logUserIn = () => {
    console.info('logging in');
    return chai
      .request(app)
      .post('/auth/login')
      .send({ username: testUserData.username, password: testUserData.password })
      .then(res => {
        authToken = res.body.authToken;
        return authToken;
      })
      .catch(err => console.log(err));
  };

  const createMockConfigurations = async () => {
    console.info('creating mock configurations');
    const owner = await createMockUser();
    await logUserIn();
    testConfigData.owner = owner;
    return chai
      .request(app)
      .post('/configurations/')
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

  it.only('Should send back a configuration by id', async () => {
    const mockConfig = await createMockConfigurations();
    let agent = chai.request.agent(app);
    return agent
      .get(`/configurations/${mockConfig.body.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .then(res => {
        const hasKeys = configFields.reduce((acc, x) => acc && res.body.hasOwnProperty(x));
        console.log(res.body);
        assert.equal(typeof res.body, 'object', 'failed res body');
        assert.equal(res.body.id, mockConfig.body.id, 'failed id check');
        assert.equal(hasKeys, true, 'failed key compare');
        return res;
      });
  });
});
