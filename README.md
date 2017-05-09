# Craft Beer API

Serving up suds and data on America's craft beers.

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

#### `/api/v1/breweries/by/:property`

Returns all records with similar or matching values for the given property. Parameters must be formatted as `property=value` (ex: `city=Louisville`). Spaces in names must be replaced with `%20`. Available properties to search by include name, city, and state.