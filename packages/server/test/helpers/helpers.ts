import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../index';
import { userTestData } from '../structures';

chai.use(chaiHttp);

const { testUserData, testConfigData } = userTestData;

export const createMockUser = (): any => {
  return chai
    .request(app)
    .post('/users')
    .send(testUserData)
    .then(res => res)
    .catch(err => console.log(err));
};

export const logUserIn = (): any => {
  return chai
    .request(app)
    .post('/auth/login')
    .send({ username: testUserData.username, password: testUserData.password })
    .then(res => res.body.authToken)
    .catch(err => console.log(err));
};

export const createMockConfigurations = async (): Promise<any> => {
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
