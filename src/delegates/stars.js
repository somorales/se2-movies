const db = require(__base + '/db');

const Star = db.getModel('stars');

const create = async data => {
  let star = await Star.create(data);
  return star;
};

const getAll = async () => {
  let stars = await Star.getAll();
  return stars;
};

const remove = async id => {
  let removed = await Star.remove(id);
  return removed;
};

const getById = async id => {
  let star = await Star.getById(id);
  return star;
};

module.exports = {
  create,
  getAll,
  remove,
  getById
};
