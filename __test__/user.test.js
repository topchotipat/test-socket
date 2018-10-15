/* eslint-disable */

import request from 'supertest';
import MongodbMemoryServer from 'mongodb-memory-server';
import mongooseClient from '../src/libraries/database/mongoose';
import server from '../src/index';
import responseFormat from '../src/middlewares/responseHandler';

let mongoServer;
let mongoClient;

describe('/v1/users', () => {
  beforeAll(async () => {
    mongoServer = new MongodbMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();
    mongooseClient(mongoUri)
      .then(dbClient => {
        console.log(`Connected to ${dbClient.host}:${dbClient.port}/${dbClient.name}`);
        mongoClient = dbClient;
        // console.log(dbClient.models.User);
      })
      .catch(err => {
        console.error('Unable to start server!', err);
        process.exit(1);
      });
  });

  afterEach(async () => {
    await server.close();
  });

  afterAll(async () => {
    await mongoServer.stop();
  });

  describe('GET /:id', () => {
    it('should response with status code 200', async () => {
      const result = await request(server).get('/v1/users/test');
      expect(result.status).toBe(200);
    });
  });

  describe('POST /', () => {
    it('should response with status code 200', async () => {
      const result = await request(server)
        .post('/v1/users/')
        .send({
          username: 'test',
          password: 'password'
        });
      // const expected = { username: 'test', password: 'password' };
      // expect(result.body).toMatchObject(expected);
      // console.log(result.res);
      expect(result.status).toBe(200);
    });
  });
});
