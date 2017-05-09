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
  return database.select().from('breweries').where('id', id).first()
}

function findBy(property, value) {
  return database.select().from('breweries').where(property, 'like', `%${value}%`)
}

function beers(id) {
  return database.select().from('beers').where('brewery_id', id)
}

module.exports = {
  all: all,
  find: find,
  findBy: findBy,
  beers: beers,
  clearAll: clearAll,
  create: create
}
