exports.up = function(knex, Promise) {
	return knex.schema.createTable('beers', (table) => {
		table.increments()
		table.integer('abv')
		table.integer('ibu')
		table.string('name')
		table.string('style')
		table.integer('brewery_id')
		table.integer('ounces')
		table.timestamps()
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('beers')
};
