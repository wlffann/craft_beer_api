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

module.exports = {
	all: all,
	create: create,
	clearAll: clearAll
}
