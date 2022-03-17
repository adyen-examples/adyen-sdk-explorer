const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../../../index');
const { testUserData, testConfigData } = require('../../structures').userTestData;

chai.use(chaiHttp);

const createMockUser = () => {
  return chai
    .request(app)
    .post('/users')
    .send(testUserData)
    .then(res => res)
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

const createMockConfigurations = async () => {
  const user = await createMockUser();
  const authToken = await logUserIn();
  const userId = user.body.id;
  testConfigData.owner = userId;
  return chai
    .request(app)
    .post(`/configurations/${userId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(testConfigData)
    .then(res => ({ mockConfig: res, authToken, userId }))
    .catch(err => console.log(err));
};

module.exports = { logUserIn, createMockUser, createMockConfigurations };
