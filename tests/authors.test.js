const request = require('supertest');

const app = require('../src/app');

describe('Authors API', () => {

  test('GET /api/authors debe responder 200', async () => {
    const response = await request(app).get('/api/authors');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/authors debe crear un autor', async () => {
    const newAuthor = {
      name: 'Gabriel Garcia Marquez',
      email: `gabo${Date.now()}@test.com`
    };

    const response = await request(app)
      .post('/api/authors')
      .send(newAuthor);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newAuthor.name);
  });

  test('POST /api/authors sin name debe fallar', async () => {
    const response = await request(app)
      .post('/api/authors')
      .send({
        email: 'error@test.com'
      });

    expect(response.status).toBe(400);
  });

});