# Craft Beer API

Serving up suds and data on America's craft beers.

Built on Node.js and Express.js, this api serves data in JSON for 500+ craft breweries in the US and their beers. It is based on the Kaggle dataset by Jean-NicholasHould that can be found [here](https://www.kaggle.com/nickhould/craft-cans).

## Available Endpoints

#### `/api/v1/beers`

Returns all records of beers with their name, style, ibu, abv, and ounces.

#### `/api/v1/beers/:id`

Returns the record for the beer with the matching id.

#### `/api/v1/beers/by/:property`

Returns all records with similar or matching values for the given property. Parameters must be formatted as `property=value` (ex: `style=American%20IPA`). Spaces in names must be replaced with `%20`. Available properties to search by include name and style.

#### `/api/v1/beers/within/:range`

Returns all records with properties within the given range. Parameters must be formatted as `property=range` (ex: `ibu=0.05-0.07`). Available properties to search by include ibu, abv and ounces.

#### `/api/v1/breweries`

Returns all records of breweries including their name, city and state.

#### `/api/v1/breweries/:id`

Returns the record for the brewery with the matching id.

#### `/api/v1/breweries/:id/beers`

Returns all beers for the brewery with the matching id.

#### `/api/v1/breweries/by/:property`

Returns all records with similar or matching values for the given property. Parameters must be formatted as `property=value` (ex: `city=Louisville`). Spaces in names must be replaced with `%20`. Available properties to search by include name, city, and state.

## Installation

To run the Craft Beer API on your local machine, first, clone this repository:

```
$ git clone https://github.com/wlffann/craft_beer_api.git
$ cd craft_beer_api
```

Then, run the following commands to set up the environment and database and to start the server:

```
$ npm install
$ knex migrate:latest
$ knex seed:run
$ npm start
```

To run the test suite:

```
$ npm test
```