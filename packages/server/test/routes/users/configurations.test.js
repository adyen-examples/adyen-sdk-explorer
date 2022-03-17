const chai = require('chai');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const { wrongAuthToken } = require('../../structures').userTestData;
const { TEST_DATABASE_URL } = require('../../../config');
const { createMockConfigurations } = require('./helpers');
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

describe('Configurations API', () => {
  const configFields = ['id', 'owner', 'name', 'version', 'configuration'];

  let authToken, userId;

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
    const { mockConfig } = await createMockConfigurations();
    const hasKeys = configFields.reduce((acc, x) => acc && mockConfig.body.hasOwnProperty(x));
    assert.equal(mockConfig.status, 200);
    assert.equal(hasKeys, true);
  });

  it('Should reject request for config with wrong auth token', async () => {
    const { mockConfig } = await createMockConfigurations();
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
    const { mockConfig, authToken, userId } = await createMockConfigurations();
    let agent = chai.request.agent(app);
    return agent
      .get(`/configurations/${userId}/${mockConfig.body.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .then(res => {
        const hasKeys = configFields.reduce((acc, x) => acc && res.body.hasOwnProperty(x));
        assert.equal(res.status, 201);
        assert.equal(typeof res.body, 'object', 'failed res body');
        assert.equal(res.body.id, mockConfig.body.id, 'failed id check');
        assert.equal(hasKeys, true, 'failed key compare');
        return res;
      });
  });
});
