exports.up = function(knex, Promise) {
	knex.schema.createTable('breweries', (table) => {
		table.integer('id')
		table.string('name')
		table.string('city')
		table.string('state')
		table.timestamps()
	})  
};

exports.down = function(knex, Promise) {
	knex.schema.dropTable('breweries') 
};
