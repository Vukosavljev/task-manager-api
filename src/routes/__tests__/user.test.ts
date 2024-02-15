import { INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE } from '../../constants';
import { app } from '../../app';
import supertest from 'supertest';

const userDataMock = {
  name: 'User name test',
  email: 'userForTesting@gmail.com',
  password: 'userForTestingPassword',
};

describe('User routes', () => {
  describe('/api/users/register POST', () => {
    afterAll(async () => {
      await supertest(app).delete('/api/users/remove').send(userDataMock);
    });
    it('should register new user ', async () => {
      const { body, statusCode } = await supertest(app)
        .post('/api/users/register')
        .send(userDataMock);

      expect(body.success).toBe(true);
      expect(body.token).toBeDefined();
      expect(statusCode).toBe(201);
    });
    it('should NOT register new user when email already exist', async () => {
      const { body, statusCode } = await supertest(app)
        .post('/api/users/register')
        .send(userDataMock);

      expect(body.success).toBe(false);
      expect(body.token).toBeUndefined();
      expect(body.errors).toBeDefined();
      expect(statusCode).toBe(422);
    });
  });

  describe('/api/users/login POST', () => {
    beforeAll(async () => {
      await supertest(app).post('/api/users/register').send(userDataMock);
    });
    afterAll(async () => {
      await supertest(app).delete('/api/users/remove').send(userDataMock);
    });
    it('should login user', async () => {
      const { body, statusCode } = await supertest(app)
        .post('/api/users/login')
        .send(userDataMock);

      expect(body.success).toBe(true);
      expect(body.token).toBeDefined();
      expect(statusCode).toBe(200);
    });
    it('should NOT login user with non existing email', async () => {
      const { body, statusCode } = await supertest(app)
        .post('/api/users/login')
        .send({
          email: 'nonExisting@gmail.com',
          password: userDataMock.password,
        });

      expect(body.success).toBe(false);
      expect(body.token).toBeUndefined();
      expect(body.error).toBe(INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE);
      expect(statusCode).toBe(401);
    });
    it('should NOT login user with bad email format', async () => {
      const { body, statusCode } = await supertest(app)
        .post('/api/users/login')
        .send({ email: 'badFormat', password: userDataMock.password });

      expect(body.success).toBe(false);
      expect(body.token).toBeUndefined();
      expect(body.errors).toBeDefined();
      expect(statusCode).toBe(422);
    });
    it('should NOT login user with wrong password', async () => {
      const { body, statusCode } = await supertest(app)
        .post('/api/users/login')
        .send({ email: userDataMock.email, password: 'wrongPassword' });

      expect(body.success).toBe(false);
      expect(body.token).toBeUndefined();
      expect(body.error).toBe(INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE);
      expect(statusCode).toBe(401);
    });
  });

  describe('/api/users/logout POST', () => {
    it('should logout user', async () => {
      // TBD
      // const { body, statusCode } = await supertest(app)
      //   .post('/api/users/logout')
      //   .send();
    });
  });
});
