const request = require('supertest');
const app = require('../app'); // Export app from app.js to make testing possible

describe('API Tests', () => {
  it('should return a welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Hello, World! Deployed using GitHub Actions with MongoDB 🚀');
  });

  it('should save a message to the database', async () => {
    const res = await request(app).post('/message').send({ text: 'Test message' });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Message saved!');
  });

    it('should return all messages from the database', async () => {
        const res = await request(app).get('/messages');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

});
