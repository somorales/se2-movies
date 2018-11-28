const starsDelegate = require('./stars');

describe('testing stars.create function', () => {
  test('should generate an ID', async () => {
    let star = await starsDelegate.create({
      name: 'Tim',
      lastname: 'Robbins'
    });
    expect(star.id).toBeDefined();
  });
});

describe('testing stars.getById function', () => {
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

  test('should return a star matching the ID', async () => {
    let starFromDB = await starsDelegate.getById(star.id);
    expect(starFromDB).toBeDefined();
    expect(starFromDB.id).toBe(star.id);
    expect(starFromDB.name).toBeDefined();
    expect(starFromDB.lastname).toBeDefined();
  });
});
