const app = require('./server');
const supertest = require('supertest');

test('GET /api/users', async () => {
  await supertest(app)
    .get('/api/users')
    .expect(200)
    .then((res) => {
      expect(Array.isArray(res.body.users)).toBeTruthy();
      expect(res.body.users.length).toEqual(0);
    });
});
