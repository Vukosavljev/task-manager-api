import supertest from 'supertest';
import {
  INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE,
  INVALID_RESET_TOKEN_ERROR_MESSAGE,
  LOGGED_OUT_SUCCESS_MESSAGE,
  USER_WITH_EMAIL_NOT_FOUND_ERROR_MESSAGE,
} from '@constants';
import { app } from '../../app';

const userDataMock = {
  name: 'User name test',
  email: 'testing@gmail.com',
  password: 'userForTestingPassword',
};
const nonExistingEmail = 'nonExisting@gmail.com';
const wrongPassword = 'wrongPasswordExample';

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
          email: nonExistingEmail,
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
        .send({ email: userDataMock.email, password: wrongPassword });

      expect(body.success).toBe(false);
      expect(body.token).toBeUndefined();
      expect(body.error).toBe(INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE);
      expect(statusCode).toBe(401);
    });
  });

  describe('/api/users/logout GET', () => {
    beforeAll(async () => {
      await supertest(app).post('/api/users/register').send(userDataMock);
    });
    afterAll(async () => {
      await supertest(app).delete('/api/users/remove').send(userDataMock);
    });
    it('should logout user successfully', async () => {
      const { body, statusCode } =
        await supertest(app).get('/api/users/logout');
      expect(body.success).toBe(true);
      expect(body.token).toBeUndefined();
      expect(body.message).toBe(LOGGED_OUT_SUCCESS_MESSAGE);
      expect(statusCode).toBe(200);
    });
  });

  describe('/api/users/remove DELETE', () => {
    beforeAll(async () => {
      await supertest(app).post('/api/users/register').send(userDataMock);
    });
    afterAll(async () => {
      await supertest(app).delete('/api/users/remove').send(userDataMock);
    });
    it('should NOT delete user with wrong email', async () => {
      const { body, statusCode } = await supertest(app)
        .delete('/api/users/remove')
        .send({ email: nonExistingEmail, password: userDataMock.password });

      expect(body.success).toBe(false);
      expect(body.error).toBe(INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE);
      expect(statusCode).toBe(401);
    });
    it('should NOT delete user with wrong password', async () => {
      const { body, statusCode } = await supertest(app)
        .delete('/api/users/remove')
        .send({ email: userDataMock.email, password: wrongPassword });

      expect(body.success).toBe(false);
      expect(body.error).toBe(INVALID_EMAIL_OR_PASSWORD_ERROR_MESSAGE);
      expect(statusCode).toBe(401);
    });
  });

  describe('/api/users/forgot-password POST', () => {
    beforeAll(async () => {
      await supertest(app).post('/api/users/register').send(userDataMock);
    });
    afterAll(async () => {
      await supertest(app).delete('/api/users/remove').send(userDataMock);
    });
    it('should NOT send email to user with wrong email', async () => {
      const { body, statusCode } = await supertest(app)
        .post('/api/users/forgot-password')
        .send({ email: nonExistingEmail });

      expect(body.success).toBe(false);
      expect(body.error).toBe(USER_WITH_EMAIL_NOT_FOUND_ERROR_MESSAGE);
      expect(statusCode).toBe(404);
    });
    it('should send email to user with correct email', async () => {
      const { body, statusCode } = await supertest(app)
        .post('/api/users/forgot-password')
        .send({ email: userDataMock.email });

      expect(body.success).toBe(true);
      expect(body.message).toBe(`Email is sent to ${userDataMock.email}`);
      expect(statusCode).toBe(200);
    });
  });

  describe('/api/users//reset-password/:token POST', () => {
    beforeAll(async () => {
      await supertest(app).post('/api/users/register').send(userDataMock);
    });
    afterAll(async () => {
      await supertest(app).delete('/api/users/remove').send(userDataMock);
    });
    it('should NOT reset password without valid token', async () => {
      const { body, statusCode } = await supertest(app)
        .post('/api/users/reset-password/invalidToken')
        .send({ password: 'NewValidPassword' });

      expect(body.success).toBe(false);
      expect(body.message).toBe(INVALID_RESET_TOKEN_ERROR_MESSAGE);
      expect(statusCode).toBe(400);
    });
    // it('should reset password with valid token', async () => {
    //   const { body, statusCode } = await supertest(app)
    // TODO:find token
    //     .post(`/api/users/reset-password/${token}`)
    //     .send({ password: 'NewValidPassword' });

    //   expect(body.success).toBe(true);
    //   expect(body.message).toBe(INVALID_RESET_TOKEN_ERROR_MESSAGE);
    //   expect(statusCode).toBe(200);
    // });
  });
});
