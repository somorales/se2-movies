const db = require(__base + '/db');

const Movie = db.getModel('movies');
const starsDelegate = require('./stars');

const create = async data => {
  // TODO: validations. required fields, stars should be an array of numbers
  let movie = await Movie.create(data);
  return movie;
};

const getAll = async () => {
  let movies = await Movie.getAll();
  return movies;
};

const remove = async id => {
  let removed = await Movie.remove(id);
  return removed;
};

const getById = async id => {
  let movie = await Movie.getById(id);
  let stars = [];

  // we retrieve the star records from the DB
  for (let starId of movie.stars) {
    let star = await starsDelegate.getById(starId);
    stars.push(star);
  }
  movie.stars = stars;
  return movie;
};

module.exports = {
  create,
  getAll,
  remove,
  getById
};
