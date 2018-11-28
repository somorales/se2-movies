const moviesDelegate = require('./movies');
const starsDelegate = require('./stars');

describe('testing movies.create function', () => {
  let star;

  beforeAll(async () => {
    star = await starsDelegate.create({
      name: 'Tim',
      lastname: 'Robbins'
    });
  });

  afterAll(async () => {
    await starsDelegate.remove(star.id);
  });

  test('should generate an ID', async () => {
    let movie = await moviesDelegate.create({
      title: 'The Shawshank Redemption',
      year: 1994,
      stars: [star.id]
    });
    expect(movie.id).toBeDefined();
  });
});

describe('testing movies.getById function', () => {
  let star;
  let movie;

  beforeAll(async () => {
    star = await starsDelegate.create({
      name: 'Tim',
      lastname: 'Robbins'
    });

    movie = await moviesDelegate.create({
      title: 'The Shawshank Redemption',
      year: 1994,
      stars: [star.id]
    });
  });

  afterAll(async () => {
    await starsDelegate.remove(star.id);
    await moviesDelegate.remove(movie.id);
  });

  test('should return a movie matching the ID', async () => {
    let movieFromDB = await moviesDelegate.getById(movie.id);
    expect(movieFromDB).toBeDefined();
    expect(movieFromDB.id).toBe(movie.id);
    expect(movieFromDB.title).toBeDefined();
    expect(movieFromDB.year).toBeDefined();
    expect(movieFromDB.stars).toBeInstanceOf(Array);
    expect(movieFromDB.stars).toHaveLength(1)
  });
});
