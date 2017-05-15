const path = require('path');
 
const seedFile = require('knex-seed-file');

exports.seed = function(knex, Promise) {
  return knex('beers').del()
  .then(() => seedFile(knex, path.resolve('./data/beers.csv'), 'beers', [
    null,
    'abv',
    'ibu',
    'id',
    'name',
    'style',
    'brewery_id',
    'ounces'
  ], {
    columnSeparator: ',',
    ignoreFirstLine: true
  }))
}