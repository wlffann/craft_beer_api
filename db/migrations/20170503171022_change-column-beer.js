exports.up = function(knex, Promise) {
	knex.schema.table('beers', (table) => {
		table.dropColumn('abv')
		table.float('abv')
	})  
};

exports.down = function(knex, Promise) {
  
};
