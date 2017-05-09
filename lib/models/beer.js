const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function all() {
	return database.select().from('beers')
}

function clearAll() {
	return database.raw('TRUNCATE beers RESTART IDENTITY')
}

function create(ibu, abv, name, style, brewery_id, ounces) {
	return database.raw('INSERT INTO beers (ibu, abv, name, style, brewery_id, ounces) VALUES (?::numeric, ?::numeric, ?, ?, ?::numeric, ?::numeric)',
											[ibu, abv, name, style, brewery_id, ounces])
}

function find(beerId) {
	return database.select('*').from('beers').where({id: beerId}).first()
}

function find_by(property, value) {
	return database.select('*').from('beers').where(property, 'like', `%${value}%`)
}

function find_range(property, range) {
	return database.select('*').from('beers').whereBetween(property, range).orderBy(property, 'asc')
}

module.exports = {
	all: all,
	create: create,
	clearAll: clearAll,
	find: find,
	find_by: find_by,
	find_range: find_range
}
