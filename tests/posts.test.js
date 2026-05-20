const request = require('supertest');

const app = require('../src/app');

describe('Posts API', () => {

  test('GET /api/posts debe responder 200', async () => {
    const response = await request(app).get('/api/posts');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/posts debe crear un post', async () => {
    const newPost = {
      title: 'Nuevo Post',
      content: 'Contenido de prueba',
      author_id: 1
    };

    const response = await request(app)
      .post('/api/posts')
      .send(newPost);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newPost.title);
  });

  test('GET /api/posts/99999 debe responder 404', async () => {
    const response = await request(app)
      .get('/api/posts/99999');

    expect(response.status).toBe(404);
  });

});