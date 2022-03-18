import chai from 'chai';
import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import { userTestData } from '../../structures';
import { TEST_DATABASE_URL } from '../../../config';
import { userHelpers } from '../helpers';
import { app, runServer, closeServer } from '../../../index';

const assert = chai.assert;

chai.use(chaiHttp);

const { createMockConfigurations } = userHelpers;

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
    assert.equal(mockConfig.status, 200, 'failed status check');
    assert.isTrue(hasKeys, 'failed key compare');
  });

  it('Should reject request for config with wrong auth token', async () => {
    const { mockConfig, userId } = await createMockConfigurations();
    let agent = chai.request.agent(app);
    return agent
      .get(`/configurations/${userId}/${mockConfig.body.id}`)
      .set('Authorization', `Bearer ${userTestData.wrongAuthToken}`)
      .then(res => {
        assert.equal(res.status, 401, 'failed status check');
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
        assert.equal(res.status, 201, 'failed status check');
        assert.equal(typeof res.body, 'object', 'failed res body');
        assert.equal(res.body.id, mockConfig.body.id, 'failed id check');
        assert.isTrue(hasKeys, 'failed key compare');
        return res;
      });
  });
});
