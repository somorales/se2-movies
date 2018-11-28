const request = require('supertest');

const app = require(__base + '/app');

test('GET /movies should return 200', async () => {
  const response = await request(app).get('/movies');
  expect(response.statusCode).toBe(200);
});

describe('POST /movies', () => {
  let spy;

  beforeAll(() => {
    const moviesDelegate = require(__base + '/delegates/movies');
    spy = jest.spyOn(moviesDelegate, 'create').mockImplementation(() => {
      return {
        id: 1,
        title: 'The Shawshank Redemption',
        year: 1994,
        stars: [1]
      };
    });
  });

  afterAll(() => {
    spy.mockRestore();
  });

  test('should return 200', async () => {
    const response = await request(app)
      .post('/movies')
      .send({})
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
  });

  test('should return a movie object', async () => {
    const response = await request(app)
      .post('/movies')
      .send({})
      .set('Accept', 'application/json');

    const movie = response.body;
    expect(movie.id).toBeDefined();
    expect(movie.title).toBeDefined();
    expect(movie.year).toBeDefined();
    expect(movie.stars).toBeInstanceOf(Array);
    expect(movie.stars.length).toBe(1);
  });
});
