const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function all() {
	return database.select().from('beers')
}

function clearAll() {
	return database.raw('TRUNCATE beers RESTART IDENTITY')
}

function create(id, ibu, abv, name, style, brewery_id, ounces) {
	return database.raw('INSERT INTO beers (id, ibu, abv, name, style, brewery_id, ounces) VALUES (?::numeric, ?::numeric, ?::numeric, ?, ?, ?::numeric, ?::numeric)',
											[id, ibu, abv, name, style, brewery_id, ounces])
}

function find(beerId) {
	return database.select('*').from('beers').where({id: beerId}).first()
}

function findBy(property, value) {
	return database.select('*').from('beers').where(property, 'like', `%${value}%`)
}

function findRange(property, range) {
	return database.select('*').from('beers').whereBetween(property, range).orderBy(property, 'asc')
}

module.exports = {
	all: all,
	create: create,
	clearAll: clearAll,
	find: find,
	findBy: findBy,
	findRange: findRange
}
