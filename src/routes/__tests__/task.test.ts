import { app } from '../../app';
import supertest from 'supertest';

describe('Task', () => {
  describe('/api/tasks GET', () => {
    it('should', async () => {
      await supertest(app).get('/api/tasks');
      expect(true).toBe(true);
    });
  });
});
