
exports.up = function(knex, Promise) {
  return knex.raw('ALTER TABLE beers ALTER COLUMN ounces TYPE decimal') 
};

exports.down = function(knex, Promise) {
  
};
