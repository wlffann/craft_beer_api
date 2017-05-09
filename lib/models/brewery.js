const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function all() {
  return database.select().from('breweries')
}

function clearAll() {
  return database.raw('TRUNCATE breweries RESTART IDENTITY')
}

function create(id, name, city, state) {
  return database.raw('INSERT INTO breweries (id, name, city, state, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
                      [id, name, city, state, new Date, new Date])
}

function find(id) {
  return database.select('*').from('breweries').where('id', id).first()
}

module.exports = {
  all: all,
  find: find,
  clearAll: clearAll,
  create: create
}
