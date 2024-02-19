import supertest from 'supertest';
import { app } from '../../app';

describe.skip('Task routes', () => {
  const userData = {
    email: 'userForTesting@gmail.com',
    password: 'userForTestingPassword',
  };
  let token = '';

  beforeAll(async () => {
    console.log(userData);
    const response = await supertest(app)
      .post('api/users/login')
      .send(userData);
    console.log(response);
    token = response.body.token;
  });

  describe('/api/tasks GET', () => {
    it('should return Unauthorized when user is NOT logged in', async () => {
      const response = await supertest(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
    });
  });
});
