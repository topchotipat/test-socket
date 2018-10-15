/* eslint-disable */

import request from 'supertest';
import MongodbMemoryServer from 'mongodb-memory-server';
import mongooseClient from '../src/libraries/database/mongoose';
import server from '../src/index';

let mongoServer;

describe('/v1/hello-world', () => {
  beforeAll(async () => {
    mongoServer = new MongodbMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();
    mongooseClient(mongoUri)
      .then(dbClient => {
        console.log(`Connected to ${dbClient.host}:${dbClient.port}/${dbClient.name}`);
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

  describe('GET /', () => {
    it('should response with status code 200', async () => {
      const result = await request(server).get('/v1/hello-world/');
      expect(result.status).toBe(200);
    });
  });
});
