
exports.up = function(knex, Promise) {
  return knex.raw('ALTER TABLE beers ALTER COLUMN abv TYPE decimal')
};

exports.down = function(knex, Promise) {
  
};
