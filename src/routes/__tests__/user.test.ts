import { app } from '../../app';
import supertest from 'supertest';

describe('User controller', () => {
  const userData = {
    name: 'User name test',
    email: 'userForTesting@gmail.com',
    password: 'userForTestingPassword',
  };

  describe('/api/users/register POST', () => {
    it('should register new user', async () => {
      const { body, statusCode } = await supertest(app)
        .post('/api/users/register')
        .send(userData);

      expect(body.success).toBe(true);
      expect(body.token).toBeDefined();
      expect(statusCode).toBe(201);
    });
  });
});
