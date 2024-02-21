import supertest from 'supertest';
import { app } from '../app';

describe.skip('Task routes', () => {
  beforeAll(async () => {
    await supertest(app).post('api/users/login');
  });

  describe('/api/tasks GET', () => {
    it('should return Unauthorized when user is NOT logged in', async () => {
      const response = await supertest(app).get('/api/tasks');

      expect(response.statusCode).toBe(200);
    });
  });
});
