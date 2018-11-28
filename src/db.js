// in-memory db
let database = {
  // properties are fake tables.
  movies: [],
  stars: []
};

const _create = (table, data) => {
  const id = database[table].length + 1;
  const record = { id, ...data };
  database[table].push(record);
  return record;
};

const _update = (table, id, data) => {
  let recordFromDB = _getById(table, id);
  let updatedRecord = {
    ...recordFromDB,
    ...data
  };
  _remove(table, id);
  database[table].push(updatedRecord);
  return updatedRecord;
};

const _remove = (table, id) => {
  const idx = database[table].findIndex(record => record.id === id);
  const records = database[table].splice(idx, 1);
  // we return the removed record
  return records[0];
};

const _getAll = table => {
  return database[table];
};

const _getById = (table, id) => {
  const records = database[table].filter(row => row.id === id);
  return records[0];
};

const getModel = table => {
  return {
    table,

    create(data) {
      return _create(this.table, data);
    },

    update(id, data) {
      return _update(this.table, id, data);
    },

    remove(id) {
      return _remove(this.table, id);
    },

    getAll() {
      return _getAll(this.table);
    },

    getById(id) {
      return _getById(this.table, id);
    }
  };
};

module.exports = {
  getModel
};
