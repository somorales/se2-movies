const request = require('supertest');

const app = require(__base + '/app');

test('GET /stars should return 200', async () => {
  const response = await request(app).get('/stars');
  expect(response.statusCode).toBe(200);
});

describe('POST /stars', () => {
  let spy;

  beforeAll(() => {
    const starsDelegate = require(__base + '/delegates/stars');
    spy = jest.spyOn(starsDelegate, 'create').mockImplementation(() => {
      return {
        id: 1,
        name: 'Tim',
        lastname: 'Robbins'
      };
    });
  });

  afterAll(() => {
    spy.mockRestore();
  });

  test('should return 200 and an ID for the star object', async () => {
    const response = await request(app)
      .post('/stars')
      .send({})
      .set('Accept', 'application/json');
    const star = response.body;
    expect(response.statusCode).toBe(200);
    expect(star.id).toBeDefined();
  });
});
