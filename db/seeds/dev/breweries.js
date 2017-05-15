const path = require('path');
 
const seedFile = require('knex-seed-file');

exports.seed = function(knex, Promise) {
  return knex('breweries').del()
  .then(() => seedFile(knex, path.resolve('./data/breweries.csv'), 'breweries', [
    'id',
    'name',
    'city',
    'state'
  ], {
    columnSeparator: ',',
    ignoreFirstLine: true
  }))
}