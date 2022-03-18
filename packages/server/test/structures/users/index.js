const testUserData = require('./testUser.json');
const testConfigData = require('./testConfigs.json');

const wrongAuthToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzMzc5YjljZjQyNjVjMDNmYjc4ZmI0IiwidXNlcm5hbWUiOiJ1c2VybmFtZSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImFkeWVuS2V5IjpudWxsLCJtZXJjaGFudEFjY291bnRzIjpbXSwiY29uZmlndXJhdGlvbnMiOltdfSwiaWF0IjoxNjQ3NTQwNjY1LCJleHAiOjE2NDc2MjcwNjUsInN1YiI6InVzZXJuYW1lIn0.QCj6r6-nM9s8unajhUTc3He7Ga_tSxs_rW_FwxVqsNo';

module.exports = {
  testUserData,
  testConfigData,
  wrongAuthToken
};
